import { useEffect, useRef } from "react";

const useOutsideRef=(handler:()=>void, ...deps:any[])=>{
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    const handleClickOutside = (e:MouseEvent):void=>{
      if(inputRef.current && !inputRef.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [inputRef, ...deps])
  return inputRef
}

export default useOutsideRef;