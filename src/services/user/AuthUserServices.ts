import { prismaClient } from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthRequest{
    email: string
    password: string
}

class AuthUserServices{
    async execute({ email, password }: IAuthRequest){

        //verificar se email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User/passoword incorrect")
        }

        //preciso verificar se a senha que ele mandou está correta.
        const passowordMatch = await  compare(password, user.password);

        if(!passowordMatch){
            throw new Error("User/passoword incorrect")
        }

        // gerar um token JWT e devolver os dados do usuario com id, name e email
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,{
                subject:user.id,
                expiresIn: '30d'
            }
        )


        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserServices }