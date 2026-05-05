export const metadata = {
  title: "Wild Algarve — Authentic Off-Road Safari Tours in Portugal",
  description: "Discover the untamed soul of southern Portugal aboard an authentic UMM Jeep. 3-hour off-road safari tours from Albufeira. Book your adventure today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
