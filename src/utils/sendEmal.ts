import * as nodemailer from 'nodemailer';

export function sendEmail(prodId: string, prodName: string, address: string, custEmail: string){
    console.log('in send email');
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '309302219003@bitraipur.ac.in',
          pass: '12345678'
        }
    });
    
    const mailOptions = {
      from: '309302219003@bitraipur.ac.in',
      to: 'adityayarize@gmail.com',
      subject: (prodName || address || custEmail) ?'order': "order cancellation",
      text: (prodName || address || custEmail) ? `email: ${custEmail}, product id: ${prodId}, product name: ${prodName}, address: ${address}` : `Order with order id ${prodId} has been canceled.`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
}


