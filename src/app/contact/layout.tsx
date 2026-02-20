import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | North Star Online",
  description: "Get in touch with North Star Online. We're here to help with your learning journey.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
