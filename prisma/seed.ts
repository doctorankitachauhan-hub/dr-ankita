import { Role } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'

async function Seed() {
    try {
        console.log("Seeding Data to db!!");

        const docEmail = "drankita@email.com";
        const docPass = "Priyeshray1@";

        const hashedPassword = await bcrypt.hash(docPass, 10);

        const doc = await prisma.user.create({
            data: {
                name: "Dr Ankita Chauhan",
                email: docEmail,
                phone: "+91 1234567890",
                dob: "09/06/1980",
                password: hashedPassword,
                role: Role.DOCTOR,

                doctorProfile: {
                    create: {
                        specialization: "Gynecologist",
                        experience: 10,
                        consultationFee: 500,
                        bio: "Experienced gynecologist specializing in women's health and pregnancy care.",
                    },
                },
            },

            include: {
                doctorProfile: true,
            },
        })
        console.log("Doctor created:", doc);

    } catch (error) {
        console.log("Error while seedin data", error);
        return new Error("Error!!")
    }
}

Seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });