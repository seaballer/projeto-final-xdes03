export interface IUserInfo{
    userName: string
}

export default function UserInfo(userInfo: IUserInfo){

    const regex = /@.*/i;
    const atIndex = userInfo.userName.replace(regex,"");

    return(
        <p className='p'>Olá, {atIndex}</p>
    )

}