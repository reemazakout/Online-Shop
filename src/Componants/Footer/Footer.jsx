import google from "../../assets/images/get-apple-store.png";
import apple from "../../assets/images/get-google-play.png";
import amazon from "../../assets/images/amazon-pay.png";
import American from "../../assets/images/American-Express-Color.png";
import paypal from "../../assets/images/paypal.png";
import mastercard from "../../assets/images/mastercard.webp";

export default function Footer() {
  return (
    <footer className="bg-slate-100 w-full py-4 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold">Get the Freshcart app</h2>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
          modi?
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            className="form-control flex-grow px-4 py-2 border border-gray-300 rounded"
            placeholder="Email... "
          />
          <button className="btn-primary px-4 py-2 text-white rounded">
            Share app link
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="font-semibold">Payment partners :</span>
            <div className="flex gap-2 items-center">
              <img src={amazon} alt="Amazon" className="w-16" />
              <img src={American} alt="American Express" className="w-16" />
              <img src={paypal} alt="PayPal" className="w-16" />
              <img src={mastercard} alt="Mastercard" className="w-16" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <span>Get our app from</span>
            <img src={google} alt="Google Play Store" className="w-16" />
            <img src={apple} alt="Apple App Store" className="w-16" />
          </div>
        </div>
      </div>
    </footer>
  );
}
