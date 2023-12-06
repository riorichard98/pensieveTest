export default function handler() {
    return async function (req, res){
        if (req.method === 'POST') {
            const { email, password } = req.body;
        
            // Example: Check if email and password match some criteria
            if (email === 'a' && password === 'a') {
              // Successful login
              res.status(200).json({ success: true });
            } else {
              // Invalid credentials
              res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
          } else {
            res.status(405).json({ success: false, message: 'Method not allowed' });
          }
    }
  }