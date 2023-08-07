import { MouseEventHandler } from "react";


export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
  }
  

export interface createDomainProps {
    handleClose : () => void
}

export enum createDomainModalStates{
  default = 0,
  select_users = 2,
  add_models = 3,
  success = 4
}