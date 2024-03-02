import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'
import { SignupType,signinInput,signupInput } from '@prvn347/common'
import { cors } from "hono/cors";
const prisma = new PrismaClient()



export const userRouter = new Hono<{
	Bindings: { 
		DATABASE_URL: string
        SECRET_KEY:string
	}
}>();
userRouter.use(cors())

userRouter.post("/signup", async (c)=>{
    const prisma = new PrismaClient({

        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
console.log(body)
    const { success } = signupInput.safeParse(body);
    console.log(success)
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    try {
        const userExisted = await prisma.user.findFirst({
        where:{
            email:body.email
            

        }
    })
    if(userExisted){
        return c.json({
            msg:"user existed"
        })
    }
    const password = new TextEncoder().encode(body.password);

    const myDigest = await crypto.subtle.digest(
  {
    name: 'SHA-256',
  },
     password 
);
        console.log(myDigest)
        const hashArray = Array.from(new Uint8Array(myDigest))
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
        console.log(new Uint8Array(myDigest));
                const user = await prisma.user.create({
			data: {
				email: body.email,
				password: hashHex,
                name:body.name
                
               
			}
		});
        
            const token = await sign({id:user.id},c.env.SECRET_KEY)
       
        
        //jwt
        //validation
	
        return c.json({
            msg:user,
            token:token
        })
	} catch(e) {
		return c.status(403);
	}

})
userRouter.post("/signin", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    try {
        const storedHash = await prisma.user.findFirst({
            where:{
                email:body.email
            },
            select:{
                email:true,
                password:true,
                id:true
            }
       
        })

// User input during login

const password = new TextEncoder().encode(body.password);

    const myDigest = await crypto.subtle.digest(
  {
    name: 'SHA-256',
  },
     password // The data you want to hash as an ArrayBuffer
);
        console.log(myDigest)
        const hashArray = Array.from(new Uint8Array(myDigest))
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
        console.log(new Uint8Array(myDigest));
        if (hashHex === storedHash?.password) {
            console.log("Password is correct");
            
          
                 const jwt = await sign({ id: storedHash.id }, "secret");
              
             
                
              return c.json({
                msg:"user signin succeful!",
                users:storedHash,
                token:jwt
              })}
        } 
        

        //jwt
       
	
      
	 catch(e) {
		return c.status(403);
	}

})