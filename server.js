const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/ContactUs', {

});


const contactSchema = new mongoose.Schema({
  name: String,
  mobile_number: String,
  adhar_number: String,
  pan_number:String,
  address:String,
  date_of_birth:Date
});

const paymentSchema = new mongoose.Schema({
  username: String,
  timing:String,
  place: String,
  price:Number,
  date:String
});


const Contact = mongoose.model('Contact', contactSchema);
const Payment = mongoose.model('Payment', paymentSchema);


app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/payment', async (req, res) => {
  try {
    const { username, timing, place ,price,date} = req.body;
    const newContact = new Payment({ username, timing, place ,price,date });
    await newContact.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('getPayment',async(req,res)=>{
  try {
    const payments = await Payment.find();
    console.log("Hi")
    if(payments.length>0){
      res.status(200).json({ payments });
    }
    else{
      res.status(200).json({ message: 'No record Found' });
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
