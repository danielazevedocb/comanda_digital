import { prismaClient  } from "../../prisma";
import { hash } from "bcryptjs";

interface IUserResquest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({ name, email, password }: IUserResquest){

        // verificar se ele enviou campo email e password
        if(!email || !password){
            throw new Error("Email/password is required.")
        }

        //Verificar se esse email já está cadastrado na plataforma
        const userAlreadyExists = await  prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })
        

        return user;
    }
}

export { CreateUserService }