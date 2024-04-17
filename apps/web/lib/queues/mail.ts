// import Bull from 'bull';
// import { sendTwoFactorTokenEmail , sendPasswordResetEmail , sendVerificationEmail } from '../mail';
// const emailQueue = new Bull('email');


// emailQueue.process(async (job, done) => {
//   const { type, email, token } = job.data;

//   try {
//     switch (type) {
//       case 'two-factor':
//         await sendTwoFactorTokenEmail(email, token);
//         break;
//       case 'password-reset':
//         await sendPasswordResetEmail(email, token);
//         break;
//       case 'verification':
//         await sendVerificationEmail(email, token);
//         break;
//       default:
//         throw new Error('Invalid email type');
//     }
//     done();
//   } catch (error) {
//     console.log(error);
//   }
// });

// export default emailQueue;