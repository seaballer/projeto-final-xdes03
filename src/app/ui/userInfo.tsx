import { Typography } from "@mui/material";

export interface IUserInfo{
    userEmail: string
}

export default function UserInfo(userInfo: IUserInfo){

    const regex = /@.*/i;
    const atIndex = userInfo.userEmail.replace(regex,"");

    return(
        <Typography variant="subtitle2">Olá, {atIndex}!</Typography>
    )

}