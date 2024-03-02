import { Hono } from 'hono'
import { userRouter } from '../routes/userRouter'
import { blogRouter } from '../routes/blogRouter'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { cors } from 'hono/cors'






const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    SECRET_KEY: string

	}
  ,Variables : {
		userId: string
	}
}>();
app.use(cors())
 app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(405);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.SECRET_KEY);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
})


app.get('/', (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  
  return c.text('Hello Hono!')
})


app.route('/api/v1',userRouter)
app.route('/api/v1',blogRouter)


export default app
