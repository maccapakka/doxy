import styles from "@doxy/design-system/tokens/core.module.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.root}>
        {children}
      </body>
    </html>
  );
}
