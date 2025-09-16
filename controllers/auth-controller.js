const registerUser = async(req , res)=>{};
const loginUser = async (req,res) =>{

    try{

    } catch(error){
        console.log(error)

        res.status(500).json({message:"internal server error"})
    }
};
export  {
    registerUser , loginUser
};