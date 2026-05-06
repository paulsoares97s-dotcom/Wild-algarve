export const metadata = {
  title: "Wild Algarve — Off-Road Jeep Safari in the Algarve, Portugal",
  description: "Skip the tourist traps. Hop in our old-school UMM Jeep for a 3-hour off-road ride through the wild Algarve. From Albufeira.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
