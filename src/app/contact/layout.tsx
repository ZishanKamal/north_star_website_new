import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | North Star Academy",
  description:
    "Partner with North Star Academy or enroll in our programs. Reach out for institutional partnerships, individual inquiries, certificate validation, or free demo requests.",
  openGraph: {
    title: "Contact Us | North Star Academy",
    description:
      "Partner with North Star Academy or enroll in our programs. Reach out for institutional partnerships, individual inquiries, or free demo requests.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
