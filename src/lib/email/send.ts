import { EMAIL_COPY, getAdminNotifyEmail, getEmailSiteUrl } from "@/constants/email";
import { ROUTES } from "@/constants/routes";
import { sendBrevoEmail } from "@/lib/email/brevo";
import { renderEmailHtml, type EmailDetailRow } from "@/lib/email/template";

export async function sendPasswordResetEmail(input: {
  email: string;
  resetUrl: string;
}) {
  const html = renderEmailHtml({
    title: "Reset your password",
    greeting: "there",
    paragraphs: [
      "We received a request to reset your Cloudora account password.",
      "This link expires in one hour. If you did not request a reset, you can ignore this email.",
    ],
    cta: { label: "Choose a new password", href: input.resetUrl },
  });

  return sendBrevoEmail({
    to: input.email,
    subject: EMAIL_COPY.resetSubject,
    text: `Reset your password: ${input.resetUrl}`,
    html,
  });
}

export async function sendBookingConfirmationEmail(input: {
  guestName: string;
  guestEmail: string;
  reference: string;
  checkIn: string;
  checkOut: string;
  rooms: string;
  advancePaid: number;
  balanceDue: number;
  total: number;
  bookingId: string;
}) {
  const details: EmailDetailRow[] = [
    { label: "Reference", value: input.reference },
    { label: "Check-in", value: input.checkIn },
    { label: "Check-out", value: input.checkOut },
    { label: "Rooms", value: input.rooms },
    { label: "Total stay", value: `₹${input.total.toLocaleString("en-IN")}` },
    { label: "Advance paid", value: `₹${input.advancePaid.toLocaleString("en-IN")}` },
    { label: "Balance due", value: `₹${input.balanceDue.toLocaleString("en-IN")}` },
  ];

  const html = renderEmailHtml({
    title: "Your stay is confirmed",
    greeting: input.guestName,
    paragraphs: [
      "Thank you for booking Cloudora Luxury Homestay. Your advance payment was received and your rooms are reserved.",
      "The remaining balance is due at the property. We look forward to welcoming you to Kodaikanal.",
    ],
    details,
    cta: {
      label: "View booking",
      href: getEmailSiteUrl(ROUTES.BOOKING_CONFIRMATION(input.bookingId)),
    },
  });

  return sendBrevoEmail({
    to: input.guestEmail,
    toName: input.guestName,
    subject: EMAIL_COPY.bookingConfirmSubject,
    text: `Booking ${input.reference} confirmed. Advance paid ₹${input.advancePaid}.`,
    html,
  });
}

export async function sendBookingAdminEmail(input: {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  reference: string;
  checkIn: string;
  checkOut: string;
  rooms: string;
  advancePaid: number;
  total: number;
  bookingId: string;
}) {
  const details: EmailDetailRow[] = [
    { label: "Reference", value: input.reference },
    { label: "Guest", value: input.guestName },
    { label: "Email", value: input.guestEmail },
    { label: "Phone", value: input.guestPhone },
    { label: "Check-in", value: input.checkIn },
    { label: "Check-out", value: input.checkOut },
    { label: "Rooms", value: input.rooms },
    { label: "Total", value: `₹${input.total.toLocaleString("en-IN")}` },
    { label: "Advance", value: `₹${input.advancePaid.toLocaleString("en-IN")}` },
  ];

  const html = renderEmailHtml({
    title: "New paid booking",
    paragraphs: ["A guest has completed advance payment for a Cloudora stay."],
    details,
    cta: {
      label: "Open in admin",
      href: getEmailSiteUrl(`/admin/bookings/${input.bookingId}`),
    },
  });

  return sendBrevoEmail({
    to: getAdminNotifyEmail(),
    subject: EMAIL_COPY.bookingAdminSubject(input.reference),
    text: `New booking ${input.reference} from ${input.guestName}`,
    html,
  });
}

export async function sendEnquiryEmails(input: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const adminHtml = renderEmailHtml({
    title: "New enquiry",
    paragraphs: [input.message],
    details: [
      { label: "Name", value: input.name },
      { label: "Email", value: input.email },
      { label: "Phone", value: input.phone || "—" },
      { label: "Subject", value: input.subject },
    ],
  });

  const guestHtml = renderEmailHtml({
    title: "We received your message",
    greeting: input.name,
    paragraphs: [
      "Thank you for writing to Cloudora. Our team will get back to you shortly.",
      "For faster help, call or WhatsApp us on the numbers listed on our website.",
    ],
  });

  await Promise.all([
    sendBrevoEmail({
      to: getAdminNotifyEmail(),
      subject: EMAIL_COPY.contactSubject(input.name),
      text: `${input.name}: ${input.message}`,
      html: adminHtml,
      replyTo: input.email,
      replyToName: input.name,
    }),
    sendBrevoEmail({
      to: input.email,
      toName: input.name,
      subject: EMAIL_COPY.contactThanks,
      text: EMAIL_COPY.contactThanks,
      html: guestHtml,
    }),
  ]);
}
