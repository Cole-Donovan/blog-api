import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Register a user
const register = async (req, res) => {
  const { name, email, password } = req.body;  // Destructure 'name' along with 'email' and 'password'

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,      // Save the 'name' field
        email,
        password: hashedPassword,
      },
    });

    // Send success response
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('Login attempt failed: User not found'); // Debugging log
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log('Login attempt failed: Invalid password'); // Debugging log
      return res.status(400).json({ error: 'Invalid password' });
    }

    if (user.role !== 'AUTHOR') {
      console.log('Login attempt failed: User is not an author'); // Debugging log
      return res.status(403).json({ error: 'Access restricted to authors only' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,  // Ensure this is the same secret used for verification
      { expiresIn: '1h' }
    );
    

    res.json({ message: 'Login successful', token, role: user.role }); // Send role back for frontend
  } catch (error) {
    console.error('Error during login:', error); // Log unexpected errors
    res.status(500).json({ error: 'Error logging in' });
  }
};




export { register, login };
