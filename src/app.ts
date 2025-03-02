import { AppDataSource } from "./db";
import { User } from "./models/User";

class Application {
    static async main() {
        try {  
           await AppDataSource.initialize();
            console.log("Database connected successfully",);

            const userRepository = AppDataSource.getRepository(User);

            const user = new User();
            user.email = "naimur@gmail1.com";
            user.password = "1234qwer";
            user.firstName = "Md Naimur";
            user.lastName = "Rahman";

            const savedUser = await userRepository.save(user);
            console.log("User created successfully:", savedUser);

            // Uncomment this if needed
            // const foundUser = await userRepository.findOneBy({ id: 1 });
            // if (!foundUser) {
            //     console.log("User not found");
            //     return;
            // }
            // const isPasswordValid = await foundUser.isPasswordValid("1234qwer");
            // console.log("Is password valid:", isPasswordValid);
        } catch (error) {
            console.error("Database connection error:", error);
        }
    }
}

export default Application;
