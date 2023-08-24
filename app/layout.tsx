import './globals.css';
import UserProvider from "@/context/user";
import ToastProvider from "@/providers/toast-provider";
import CartProvider from "@/context/cart";

export const metadata = {
  title: 'eBay Clone',
  description: 'eBay Clone',
}

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
          <CartProvider>
              <ToastProvider />
              <UserProvider>
                  {children}
              </UserProvider>
          </CartProvider>
      </body>
    </html>
  )
}
