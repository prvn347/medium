import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify,sign } from "hono/jwt";
const prisma = new PrismaClient()
import { ContentType,UpdateType, contentInput, updateContent } from "@prvn347/common";

import { cors } from "hono/cors";
export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        SECRET_KEY:string
	},Variables : {
		userId: string
        id:string
	}
}>();


blogRouter.use(cors())


blogRouter.post('/blog',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
try {
    const userId = c.get('userId')
    console.log(userId)
    const body = await c.req.json()
    console.log(body)
    const { success } = contentInput.safeParse(body);
    console.log(success)
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const blog = await prisma.post.create({
        data:{
            authorId:userId,
            title:body.title,
           content: body.content,
           published:true
        },
        select:{
            title:true,
            author:true,
            content:true,
            id:true,
            published:true

        }
       
    })
    return c.json({msg:"blog created",blog:blog})

} catch (error) {
   c.json({error:error}) 
}
	

}
)

blogRouter.put('/blog',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userId = c.get('userId')
    try {
        const body = await c.req.json()
        const { success } = updateContent.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
        const updatedBlog = await prisma.post.update({
            where:{
                id:body.id,
                authorId:userId
            },
            data:{
                title:body.title,
                content:body.content

            },
            select:{
                title:true,
                content:true,
                id:true,
                authorId:true
            }

        })
        return c.json({msg:"blog updated",
            updatedBlog:updatedBlog
        })
        
    } catch (error) {
        
    }

})

blogRouter.get('/blog/myblogs',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userId = c.get('userId')
try {
    const blogs = await prisma.post.findMany({
        where:{
            authorId:userId
        },
        select:{
            author:true,
            title:true,
            content:true,
            id:true

        }
        
    })
    return c.json({
        userBlogs:blogs
    })
} catch (error) {
    c.json({
        error:error
    })
    
}

})
blogRouter.get('/blog',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userId = c.get('userId')
try {
    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            author:true,
            id:true

    }});
    return c.json({
        userBlogs:blogs
    })
} catch (error) {
    c.json({
        error:error
    })
    
}

})
blogRouter.get('/blog/:id',async (c)=>{
    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log(id)
    const post = await prisma.post.findUnique({
		where: {
			id:id
		},
        select:{
            author:true,
            title:true,
            content:true
        }
	});


	return c.json({
        blog:post
    })
}
)