export const metadata = {
title: "Wild Algarve — Off-Road Jeep Safari in the Algarve, Portugal",
description: "Skip the tourist traps. Hop in our old-school UMM Jeep for a 3-hour off-road
keywords: "Algarve safari, Jeep tour Algarve, UMM Jeep, Albufeira tours, off-road Portugal,
openGraph: {
title: "Wild Algarve — Off-Road Jeep Safari",
description: "Skip the tourist traps. Real backroads, small group, proper fun.",
locale: "en_GB",
type: "website",
},
};
export const viewport = {
width: "device-width",
initialScale: 1,
maximumScale: 5,
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
