import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function Register() {
  const [userType, setUserType] = useState("supplier");
  const [formData, setFormData] = useState({
    companyName: "",
    commoditySold: "",
    address: "",
    phoneNumber: "",
    name: "",
    retailerName: "",
    shopAddress: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(formData.phoneNumber, JSON.stringify(formData));
    navigate("/login");
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Side: Image/Description */}
      <div className="md:w-1/2 w-full bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white flex flex-col justify-center items-center p-6 md:p-0">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Join the Network</h1>
          <p className="mb-6">
            Connect your business and access analytics tailored for your
            industry.
          </p>
          <div className="mt-4">
            <p className="text-sm">
              “The best platform for suppliers and retailers.”
            </p>
            <p className="text-sm font-bold mt-2">- Jane Doe, Manager</p>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="md:w-1/2 w-full flex justify-center items-center bg-white relative px-4 py-12 md:py-0">
        {/* Glassmorphic Panel (For Mobile View) */}
        <div className="absolute top-4 w-[80%] h-[20%] bg-white/30 backdrop-blur-lg rounded-lg md:hidden"></div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 shadow-lg rounded-lg z-10 bg-white"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

          <ToggleGroup
            type="single"
            value={userType}
            onValueChange={setUserType}
            className="mb-6"
          >
            <ToggleGroupItem value="supplier">Supplier</ToggleGroupItem>
            <ToggleGroupItem value="retailer">Retailer</ToggleGroupItem>
          </ToggleGroup>

          {userType === "supplier" ? (
            <>
              <Input
                name="companyName"
                placeholder="Company Name"
                onChange={handleChange}
                value={formData.companyName}
                required
                className="mb-6 h-12"
              />
              <Input
                name="commoditySold"
                placeholder="Commodity Sold"
                onChange={handleChange}
                value={formData.commoditySold}
                required
                className="mb-6 h-12"
              />
              <Input
                name="address"
                placeholder="Address"
                onChange={handleChange}
                value={formData.address}
                required
                className="mb-6 h-12"
              />
            </>
          ) : (
            <>
              <Input
                name="retailerName"
                placeholder="Retailer Name"
                onChange={handleChange}
                value={formData.retailerName}
                required
                className="mb-6 h-12"
              />
              <Input
                name="shopAddress"
                placeholder="Shop Address"
                onChange={handleChange}
                value={formData.shopAddress}
                required
                className="mb-6 h-12"
              />
            </>
          )}

          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phoneNumber}
            required
            className="mb-6 h-12"
          />
          <Input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
            className="mb-6 h-12"
          />

          <Button
            type="submit"
            variant="default"
            className="w-full h-12 bg-orange-500 text-white"
          >
            Create Account
          </Button>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-orange-500">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
