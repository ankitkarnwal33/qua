/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@/components/RefferalForm";
import { query } from "@/lib/db";

// Get all the reffered users by partners or individuals

export const getAllUsers = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [users]: any = await query("SELECT * FROM users", []);
    console.log(users);
    return users;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return [];
    }
  }
};

// Save a new user when they signup

export const saveUser = async (user: {
  email: string;
  hashedPassword: string;
  user_type: string;
  phone: string;
  name: string;
}) => {
  try {
    // Insert into users table
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userResult: any = await query(
      `INSERT INTO users (user_type, email, phone, password)
       VALUES (?, ?, ?, ?)`,
      [user.user_type, user.email, user.phone, user.hashedPassword]
    );

    const userId = userResult.insertId;

    if (user.user_type === "individual") {
      await query(`INSERT INTO individuals (user_id, name) VALUES (?, ?)`, [
        userId,
        user.name,
      ]);
    }
  } catch (error) {
    return error instanceof Error ? error.message : "Unknown error";
  }
};

export const saveUserPartner = async (user: {
  email: string;
  hashedPassword: string;
  user_type: string;
  phone: string;
  name: string;
  city: string;
  contactPerson: string;
  partnerType: string;
}) => {
  try {
    // Insert into users table
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userResult: any = await query(
      `INSERT INTO users (user_type, email, phone, password)
       VALUES (?, ?, ?, ?)`,
      [user.user_type || "partner", user.email, user.phone, user.hashedPassword]
    );

    const userId = userResult.insertId;

    if (user.user_type === "partner") {
      await query(
        `INSERT INTO partners (user_id, business_name, contact_person, city, partner_type, gst) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, user.name, user.contactPerson, user.city, user.partnerType, ""]
      );
    }
  } catch (error) {
    console.error("Error saving user:", error);
    return error instanceof Error ? error.message : "Unknown error";
  }
};

// Find a single user using email.

export const findUserByEmail = async (email: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user]: any = await query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (user === undefined) {
      return false;
    }
    return user;
  } catch (error) {
    if (error instanceof Error) {
    }
    return false;
  }
};

export const findUserByPhone = async (phone: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user]: any = await query("SELECT * FROM users WHERE phone = ?", [
      phone,
    ]);
    if (user === undefined) {
      return false;
    }
    return user;
  } catch (error) {
    if (error instanceof Error) {
    }
    return false;
  }
};

// Store clients

export const saveClient = async (user: Client) => {
  try {
    const result: any = await query(
      `INSERT INTO clients (referrer_id, name, email, phone, city, package_interested, goal, additional_msg)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.userId,
        user.refName,
        user.refEmail,
        user.refPhone,
        user.refCity,
        user.refPackage,
        user.language,
        user.refNotes,
      ]
    );
    console.log();
    return result?.insertId || null;
  } catch (error) {
    return error instanceof Error ? error.message : "Unknown error";
  }
};
