import { CardDemo } from "@/components/cards/CardDemoComponent";
// import { NavigationMenuDemo } from "@/components/navigation/NavbarComponent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

// static seo implement
export const metadata: Metadata = {
  title: "About",
  description: "Hak-Store is a website that build for selling product."
};

export default function about() {
  return (
    <div>
        {/* <NavigationMenuDemo></NavigationMenuDemo> */}
        Welcome to about page
        <h1>សួស្តីអ្នកទាំងអស់គ្នាមកកាន់ About page
        </h1>
        <Button>Button</Button>
        <CardDemo></CardDemo>
    </div>
  )
}

