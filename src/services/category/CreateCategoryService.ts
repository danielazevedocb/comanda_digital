import { prismaClient } from "../../prisma";

interface ICategoryRequest{
    name: string
}

export class CreateCategoryService {
    async excute({ name }: ICategoryRequest){

        if(name ===''){
            throw new Error('name Invalid')
        }

        const categoryAlreadyExists = await  prismaClient.category.findFirst({
            where:{
                name: name
            }
        })

        if(categoryAlreadyExists){
            throw new Error("category already exists")
        }

        const category = await prismaClient.category.create({
            data:{
                name: name,
            },
            select:{
                id: true,
                name: true,
            }
        })

        return category 
    }
}