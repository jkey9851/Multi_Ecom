"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { useEffect, useRef, useState } from "react";
import { useDropDownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

interface Props {
  category: Category;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown =({
  category,
  isActive,
  isNavigationHovered
}:Props)=>{
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {getDropdownPosition} = useDropDownPosition(dropdownRef)

  const dropdownPosition = getDropdownPosition();

  const onMouseEnter = ()=>{
    // if(category.subcategories){
    //   setIsOpen(true)
    // }
    if (category.subcategories && category.subcategories.length > 0) {
      // console.log("hovered, ref:", dropdownRef.current);
      setIsOpen(true);
    }
  }
  const onMouseLeave = ()=>{
    setIsOpen(false)

  }

  // useEffect(()=>{
  //   console.log("dropdownRef.current: ", dropdownRef.current);
  //   if(dropdownRef.current){
  //     console.log("Bounding box:", dropdownRef.current.getBoundingClientRect())
  //   }
  //   console.log("isopen: ", isOpen)
  // }, [isOpen])

  return (
    <div
     className="relative"
     ref={dropdownRef}
     onMouseEnter={onMouseEnter}
     onMouseLeave={onMouseLeave}
     >
      <Button
        variant={"elevated"}
        className={cn(
          "h11 px-4 bg-transparent rounded-full border-transparent hover:bg-white hover:border-primary text-black",
          isActive && !isNavigationHovered && "bg-white border-primary",
        
        )}
      >
        {category.name}
      </Button>
      {category.subcategories && category.subcategories.length > 0 &&(
        <div
        className={cn(
          "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
          isOpen && "opacity-100"
        )}>
        </div>
      )}

      <SubcategoryMenu
        category ={category}
        isOpen ={isOpen}
        position ={dropdownPosition}
       >

       </SubcategoryMenu>
       </div>

  );
};