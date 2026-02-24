import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http');

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

export interface LeadSubmission {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  whatsapp: string;
  school?: string;
  class_or_degree?: string;
  age_group?: string;
  city?: string;
  state?: string;
  how_heard?: string;
  interested_in_counseling?: boolean;
  assessment_type: 'quick' | 'full';
  total_score: number;
  max_score: number;
  overall_percentage: number;
  overall_level: string;
  self_awareness_score: number;
  managing_emotions_score: number;
  motivating_oneself_score: number;
  empathy_score: number;
  social_skill_score: number;
  time_spent_seconds?: number;
  completion_rate?: number;
  device_type?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  admin_notes?: string;
  last_contacted?: string;
}

export interface TokenData {
  id?: string;
  token_code: string;
  label?: string;
  description?: string;
  expiry_date: string;
  usage_limit?: number;
  usage_count?: number;
  features?: {
    pdfDownload?: boolean;
    certificateDownload?: boolean;
  };
  is_active?: boolean;
  created_at?: string;
}

export interface TokenValidationResult {
  valid: boolean;
  token?: TokenData;
  error?: string;
}

export async function saveLeadToDatabase(leadData: LeadSubmission) {
  if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase not configured. Lead data:', leadData);
    return { success: true, data: null };
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select();

    if (error) {
      console.error('Error saving lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception saving lead:', err);
    return { success: false, error: 'Failed to save lead' };
  }
}

export async function getAllLeads() {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Failed to fetch leads' };
  }
}

export async function updateLeadStatus(leadId: string, status: string, notes?: string) {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const updateData: any = { status, last_contacted: new Date().toISOString() };
    if (notes) updateData.admin_notes = notes;

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    return { success: false, error: 'Failed to update lead' };
  }
}

export async function deleteLead(leadId: string) {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabase.from('leads').delete().eq('id', leadId);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to delete lead' };
  }
}

export async function bulkDeleteLeads(leadIds: string[]) {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabase.from('leads').delete().in('id', leadIds);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, count: leadIds.length };
  } catch (err) {
    return { success: false, error: 'Failed to bulk delete leads' };
  }
}

function generateTokenCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createToken(data: {
  label?: string;
  description?: string;
  expiryDate: string;
  usageLimit?: number;
  features?: { pdfDownload?: boolean; certificateDownload?: boolean; };
}) {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const tokenCode = generateTokenCode();
    const tokenData = {
      token_code: tokenCode,
      label: data.label,
      description: data.description,
      expiry_date: data.expiryDate,
      usage_limit: data.usageLimit,
      features: data.features || { pdfDownload: true, certificateDownload: false },
    };

    const { data: newToken, error } = await supabase
      .from('tokens')
      .insert(tokenData)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, token: newToken };
  } catch (err) {
    return { success: false, error: 'Failed to create token' };
  }
}

export async function getAllTokens() {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured', tokens: [] };
  }

  try {
    const { data: tokens, error } = await supabase
      .from('tokens')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message, tokens: [] };
    }
    return { success: true, tokens: tokens || [] };
  } catch (err) {
    return { success: false, error: 'Failed to fetch tokens', tokens: [] };
  }
}

export async function validateToken(tokenCode: string): Promise<TokenValidationResult> {
  if (!isSupabaseConfigured) {
    return { valid: false, error: 'Supabase not configured' };
  }

  try {
    const { data: token, error } = await supabase
      .from('tokens')
      .select('*')
      .eq('token_code', tokenCode.toUpperCase())
      .single();

    if (error || !token) {
      return { valid: false, error: 'Invalid token code' };
    }
    if (!token.is_active) {
      return { valid: false, error: 'Token has been deactivated' };
    }
    const now = new Date();
    const expiryDate = new Date(token.expiry_date);
    if (expiryDate < now) {
      return { valid: false, error: 'Token has expired' };
    }
    if (token.usage_limit && token.usage_count >= token.usage_limit) {
      return { valid: false, error: 'Token usage limit reached' };
    }
    return { valid: true, token };
  } catch (err) {
    return { valid: false, error: 'Failed to validate token' };
  }
}

export async function incrementTokenUsage(tokenId: string) {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabase.rpc('increment_token_usage', { token_id: tokenId });
    if (error?.code === '42883') {
      const { data: token } = await supabase
        .from('tokens')
        .select('usage_count')
        .eq('id', tokenId)
        .single();

      if (token) {
        const { error: updateError } = await supabase
          .from('tokens')
          .update({ usage_count: (token.usage_count || 0) + 1 })
          .eq('id', tokenId);

        if (updateError) {
          return { success: false, error: updateError.message };
        }
      }
    } else if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to increment usage' };
  }
}

export async function deactivateToken(tokenId: string) {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }
  try {
    const { error } = await supabase.from('tokens').update({ is_active: false }).eq('id', tokenId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to deactivate token' };
  }
}

export async function deleteToken(tokenId: string) {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Supabase not configured' };
  }
  try {
    const { error } = await supabase.from('tokens').delete().eq('id', tokenId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to delete token' };
  }
}
