import { AppDataSource } from "./data-source";
import { User } from "./models/User";

class Application{
    static async main(){
        try {  
        await AppDataSource.initialize();
        const user = await User.findOneBy({id:16});
        const isPasswordValid = await user.isPasswordValid('1234qwer');
        console.log("isPassword valid",isPasswordValid)
        // user.email = 'mdnaimurr@gmail.com';
        // user.password = '1234qwer';
        // user.firstName = "Md Naimur";
        // user.lastName = "Rahman";
        //     await user.save();

        console.log("user created successfully");
        } catch (error) {
            console.log("Database connection error :",error)
        }


        
    }
}

export default Application;