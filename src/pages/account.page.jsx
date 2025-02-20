import { useUser } from "@clerk/clerk-react"
import { Navigate } from "react-router"
import { Loader2, Mail, Calendar, Shield, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading account details...</p>
        </div>
      </main>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />
  }

  return (
    <main className="bg-background min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">My Account</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 mt-12">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={user.imageUrl} alt={user.fullName} />
                <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-muted-foreground">Account Member</p>
              </div>
            </div>

            <Separator />

            {/* Account Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Account Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                    <p className="font-medium">{user.emailAddresses[0].emailAddress}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                    <p className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Security */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Account Security</h3>
              <div className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Account Protected</p>
                  <p className="text-sm text-muted-foreground">Your account is secured with Clerk authentication</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/my-orders">
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/shop">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Shop
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
          
        </Card>
      </div>
    </main>
  )
}

export default AccountPage

