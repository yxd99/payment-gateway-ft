import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DollarSign, LogOut, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@features/user/infrastructure/redux/user-slice";


export function AppSidebar() {
  const items = [
    {
      title: 'Products',
      url: '/',
      icon: ShoppingBag,
    },
    {
      title: 'My Payments',
      url: '/user/payments',
      icon: DollarSign,
    }
  ];

  const dispatch = useAppDispatch();
  const stageOfPayment = useAppSelector((state) => state.checkout.stageOfPayment);
  
  if (stageOfPayment !== 0) {
    items.push({
      title: 'Checkout',
      url: '/checkout',
      icon: ShoppingBag,
    })
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Shops</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button onClick={handleLogout}>
                <LogOut /> Logout
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
