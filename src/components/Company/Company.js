import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./company.css";
import SideBar from "../../Sidebar/SideBar";
import Header from "../Header";
import { Box, CircularProgress } from "@mui/material";

const Company = () => {
  const [inpval, setInpval] = useState({
    company: "",
    country: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    timezone: "",
    curruncy_symbol: "",
    financial_year: "",
  });
  const [loading, setLoading] = useState(false);

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const {
      company,
      country,
      address,
      city,
      state,
      postal_code,
      timezone,
      curruncy_symbol,
      financial_year,
    } = inpval;

    if (company === "") {
      toast.warning("Company is required!", {
        position: "top-center",
      });
    } else if (country === "") {
      toast.error("Country is required!", {
        position: "top-center",
      });
    } else if (address === "") {
      toast.error("Address is required!", {
        position: "top-center",
      });
    } else if (city === "") {
      toast.error("City is required!", {
        position: "top-center",
      });
    } else if (state === "") {
      toast.error("State is required!", {
        position: "top-center",
      });
    } else if (postal_code === "") {
      toast.error("Postal Code is required!", {
        position: "top-center",
      });
    } else if (timezone === "") {
      toast.error("Timezone is required!", {
        position: "top-center",
      });
    } else if (curruncy_symbol === "") {
      toast.error("Curruncy Symbol is required!", {
        position: "top-center",
      });
    } else if (financial_year === "") {
      toast.error("Financial Year is required!", {
        position: "top-center",
      });
    } else {
      // console.log("user registration succesfully done");

      const formData = new FormData();
      formData.append("company", company);
      formData.append("country", country);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("postal_code", postal_code);
      formData.append("timezone", timezone);
      formData.append("curruncy_symbol", curruncy_symbol);
      formData.append("financial_year", financial_year);
      formData.append("file", file);
      setLoading(true);
      const data = await axios
        .post("https://asset-3xk6.onrender.com/company", formData, {
          headers: {
            //   "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Company Details Submit Successfully done 😃!", {
              position: "top-center",
            });
            setInpval({
              //   ...inpval,
              company: "",
              country: "",
              address: "",
              city: "",
              state: "",
              postal_code: "",
              timezone: "",
              curruncy_symbol: "",
              financial_year: "",
            });
            setFile("");
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            toast.warning("Company is already exists", {
              position: "top-center",
            });
          }
        });
    }
  };

  return (
    <SideBar>
      <Header />
      <>
        <section
          className="sc"
          style={{
            height: "100%",
            width: "-webkit-fill-available",
            margin: "80px",
          }}
        >
          <div className="form_data" style={{ margin: "auto" }}>
            <div className="form_heading">
              <h3 className="head">Company details</h3>
              <p className="cont">
                Provide the name and site of the main office.
              </p>
            </div>

            <form>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="company">
                  Company <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  className="inp"
                  type="text"
                  onChange={setVal}
                  value={inpval.company}
                  name="company"
                  id="company"
                  placeholder="Enter company..."
                />
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="country">
                  Country <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  className="inp"
                  type="text"
                  onChange={setVal}
                  value={inpval.country}
                  name="country"
                  id="country"
                  placeholder="Enter country..."
                />
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="address">
                  Address <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  className="inp"
                  type="address"
                  onChange={setVal}
                  value={inpval.address}
                  name="address"
                  id="address"
                  placeholder="Enter address..."
                />
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="city">
                  City <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  className="inp"
                  type="text"
                  onChange={setVal}
                  value={inpval.city}
                  name="city"
                  id="city"
                  placeholder="Enter Your City..."
                />
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="state">
                  State <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  className="inp"
                  type="text"
                  value={inpval.state}
                  onChange={setVal}
                  name="state"
                  id="state"
                  placeholder="Enter State..."
                />
              </div>

              <div className="form_input d-flex align-items-center">
                <label htmlFor="postal_code">
                  Postal Code <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  className="inp"
                  type="number"
                  value={inpval.postal_code}
                  onChange={setVal}
                  name="postal_code"
                  id="postal_code"
                  placeholder="Enter postal code..."
                />
              </div>
              <div className="form_heading">
                <h3 className="head">Timezone & Currency</h3>
                <p className="cont">
                  Adjust the setting to fit your company's local timezone,
                  currency and date format.
                </p>
              </div>
              <div className="form_input d-flex align-items-center">
                <label htmlFor="timezone">
                  Timezone <sup style={{ color: "red" }}>*</sup>
                </label>
                {/* <input
                className="inp"
                type="date"
                value={inpval.timezone}
                onChange={setVal}
                name="timezone"
                id="timezone"
                placeholder="Enter timezone..."
              /> */}
                <select
                  class="form-select timezone"
                  id="timezone"
                  value={inpval.timezone}
                  onChange={setVal}
                  name="timezone"
                >
                  <option value="Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="Alaska">(GMT-09:00) Alaska</option>
                  <option value="Pacific Time (US &amp; Canada)">
                    (GMT-08:00) Pacific Time (US &amp; Canada)
                  </option>
                  <option value="Arizona">(GMT-07:00) Arizona</option>
                  <option value="Mountain Time (US &amp; Canada)">
                    (GMT-07:00) Mountain Time (US &amp; Canada)
                  </option>
                  <option
                    value="Central Time (US &amp; Canada)"
                    selected="selected"
                  >
                    (GMT-06:00) Central Time (US &amp; Canada)
                  </option>
                  <option value="Eastern Time (US &amp; Canada)">
                    (GMT-05:00) Eastern Time (US &amp; Canada)
                  </option>
                  <option value="Indiana (East)">
                    (GMT-05:00) Indiana (East)
                  </option>
                  <option value="" disabled="disabled">
                    -------------
                  </option>
                  <option value="International Date Line West">
                    (GMT-11:00) International Date Line West
                  </option>
                  <option value="Midway Island">
                    (GMT-11:00) Midway Island
                  </option>
                  <option value="Samoa">(GMT-11:00) Samoa</option>
                  <option value="Tijuana">(GMT-08:00) Tijuana</option>
                  <option value="Chihuahua">(GMT-07:00) Chihuahua</option>
                  <option value="Mazatlan">(GMT-07:00) Mazatlan</option>
                  <option value="Central America">
                    (GMT-06:00) Central America
                  </option>
                  <option value="Guadalajara">(GMT-06:00) Guadalajara</option>
                  <option value="Mexico City">(GMT-06:00) Mexico City</option>
                  <option value="Monterrey">(GMT-06:00) Monterrey</option>
                  <option value="Saskatchewan">(GMT-06:00) Saskatchewan</option>
                  <option value="Bogota">(GMT-05:00) Bogota</option>
                  <option value="Lima">(GMT-05:00) Lima</option>
                  <option value="Quito">(GMT-05:00) Quito</option>
                  <option value="Caracas">(GMT-04:30) Caracas</option>
                  <option value="Atlantic Time (Canada)">
                    (GMT-04:00) Atlantic Time (Canada)
                  </option>
                  <option value="La Paz">(GMT-04:00) La Paz</option>
                  <option value="Santiago">(GMT-04:00) Santiago</option>
                  <option value="Newfoundland">(GMT-03:30) Newfoundland</option>
                  <option value="Brasilia">(GMT-03:00) Brasilia</option>
                  <option value="Buenos Aires">(GMT-03:00) Buenos Aires</option>
                  <option value="Georgetown">(GMT-03:00) Georgetown</option>
                  <option value="Greenland">(GMT-03:00) Greenland</option>
                  <option value="Mid-Atlantic">(GMT-02:00) Mid-Atlantic</option>
                  <option value="Azores">(GMT-01:00) Azores</option>
                  <option value="Cape Verde Is.">
                    (GMT-01:00) Cape Verde Is.
                  </option>
                  <option value="Casablanca">(GMT) Casablanca</option>
                  <option value="Dublin">(GMT) Dublin</option>
                  <option value="Edinburgh">(GMT) Edinburgh</option>
                  <option value="Lisbon">(GMT) Lisbon</option>
                  <option value="London">(GMT) London</option>
                  <option value="Monrovia">(GMT) Monrovia</option>
                  <option value="Amsterdam">(GMT+01:00) Amsterdam</option>
                  <option value="Belgrade">(GMT+01:00) Belgrade</option>
                  <option value="Berlin">(GMT+01:00) Berlin</option>
                  <option value="Bern">(GMT+01:00) Bern</option>
                  <option value="Bratislava">(GMT+01:00) Bratislava</option>
                  <option value="Brussels">(GMT+01:00) Brussels</option>
                  <option value="Budapest">(GMT+01:00) Budapest</option>
                  <option value="Copenhagen">(GMT+01:00) Copenhagen</option>
                  <option value="Ljubljana">(GMT+01:00) Ljubljana</option>
                  <option value="Madrid">(GMT+01:00) Madrid</option>
                  <option value="Paris">(GMT+01:00) Paris</option>
                  <option value="Prague">(GMT+01:00) Prague</option>
                  <option value="Rome">(GMT+01:00) Rome</option>
                  <option value="Sarajevo">(GMT+01:00) Sarajevo</option>
                  <option value="Skopje">(GMT+01:00) Skopje</option>
                  <option value="Stockholm">(GMT+01:00) Stockholm</option>
                  <option value="Vienna">(GMT+01:00) Vienna</option>
                  <option value="Warsaw">(GMT+01:00) Warsaw</option>
                  <option value="West Central Africa">
                    (GMT+01:00) West Central Africa
                  </option>
                  <option value="Zagreb">(GMT+01:00) Zagreb</option>
                  <option value="Athens">(GMT+02:00) Athens</option>
                  <option value="Bucharest">(GMT+02:00) Bucharest</option>
                  <option value="Cairo">(GMT+02:00) Cairo</option>
                  <option value="Harare">(GMT+02:00) Harare</option>
                  <option value="Helsinki">(GMT+02:00) Helsinki</option>
                  <option value="Istanbul">(GMT+02:00) Istanbul</option>
                  <option value="Jerusalem">(GMT+02:00) Jerusalem</option>
                  <option value="Kyiv">(GMT+02:00) Kyiv</option>
                  <option value="Minsk">(GMT+02:00) Minsk</option>
                  <option value="Pretoria">(GMT+02:00) Pretoria</option>
                  <option value="Riga">(GMT+02:00) Riga</option>
                  <option value="Sofia">(GMT+02:00) Sofia</option>
                  <option value="Tallinn">(GMT+02:00) Tallinn</option>
                  <option value="Vilnius">(GMT+02:00) Vilnius</option>
                  <option value="Baghdad">(GMT+03:00) Baghdad</option>
                  <option value="Kuwait">(GMT+03:00) Kuwait</option>
                  <option value="Moscow">(GMT+03:00) Moscow</option>
                  <option value="Nairobi">(GMT+03:00) Nairobi</option>
                  <option value="Riyadh">(GMT+03:00) Riyadh</option>
                  <option value="St. Petersburg">
                    (GMT+03:00) St. Petersburg
                  </option>
                  <option value="Volgograd">(GMT+03:00) Volgograd</option>
                  <option value="Tehran">(GMT+03:30) Tehran</option>
                  <option value="Abu Dhabi">(GMT+04:00) Abu Dhabi</option>
                  <option value="Baku">(GMT+04:00) Baku</option>
                  <option value="Muscat">(GMT+04:00) Muscat</option>
                  <option value="Tbilisi">(GMT+04:00) Tbilisi</option>
                  <option value="Yerevan">(GMT+04:00) Yerevan</option>
                  <option value="Kabul">(GMT+04:30) Kabul</option>
                  <option value="Ekaterinburg">(GMT+05:00) Ekaterinburg</option>
                  <option value="Islamabad">(GMT+05:00) Islamabad</option>
                  <option value="Karachi">(GMT+05:00) Karachi</option>
                  <option value="Tashkent">(GMT+05:00) Tashkent</option>
                  <option value="Chennai">(GMT+05:30) Chennai</option>
                  <option value="Kolkata">(GMT+05:30) Kolkata</option>
                  <option value="Mumbai">(GMT+05:30) Mumbai</option>
                  <option value="New Delhi">(GMT+05:30) New Delhi</option>
                  <option value="Kathmandu">(GMT+05:45) Kathmandu</option>
                  <option value="Almaty">(GMT+06:00) Almaty</option>
                  <option value="Astana">(GMT+06:00) Astana</option>
                  <option value="Dhaka">(GMT+06:00) Dhaka</option>
                  <option value="Novosibirsk">(GMT+06:00) Novosibirsk</option>
                  <option value="Sri Jayawardenepura">
                    (GMT+06:00) Sri Jayawardenepura
                  </option>
                  <option value="Rangoon">(GMT+06:30) Rangoon</option>
                  <option value="Bangkok">(GMT+07:00) Bangkok</option>
                  <option value="Hanoi">(GMT+07:00) Hanoi</option>
                  <option value="Jakarta">(GMT+07:00) Jakarta</option>
                  <option value="Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option>
                  <option value="Beijing">(GMT+08:00) Beijing</option>
                  <option value="Chongqing">(GMT+08:00) Chongqing</option>
                  <option value="Hong Kong">(GMT+08:00) Hong Kong</option>
                  <option value="Irkutsk">(GMT+08:00) Irkutsk</option>
                  <option value="Kuala Lumpur">(GMT+08:00) Kuala Lumpur</option>
                  <option value="Perth">(GMT+08:00) Perth</option>
                  <option value="Singapore">(GMT+08:00) Singapore</option>
                  <option value="Taipei">(GMT+08:00) Taipei</option>
                  <option value="Ulaan Bataar">(GMT+08:00) Ulaan Bataar</option>
                  <option value="Urumqi">(GMT+08:00) Urumqi</option>
                  <option value="Osaka">(GMT+09:00) Osaka</option>
                  <option value="Sapporo">(GMT+09:00) Sapporo</option>
                  <option value="Seoul">(GMT+09:00) Seoul</option>
                  <option value="Tokyo">(GMT+09:00) Tokyo</option>
                  <option value="Yakutsk">(GMT+09:00) Yakutsk</option>
                  <option value="Adelaide">(GMT+09:30) Adelaide</option>
                  <option value="Darwin">(GMT+09:30) Darwin</option>
                  <option value="Brisbane">(GMT+10:00) Brisbane</option>
                  <option value="Canberra">(GMT+10:00) Canberra</option>
                  <option value="Guam">(GMT+10:00) Guam</option>
                  <option value="Hobart">(GMT+10:00) Hobart</option>
                  <option value="Melbourne">(GMT+10:00) Melbourne</option>
                  <option value="Port Moresby">(GMT+10:00) Port Moresby</option>
                  <option value="Sydney">(GMT+10:00) Sydney</option>
                  <option value="Vladivostok">(GMT+10:00) Vladivostok</option>
                  <option value="Magadan">(GMT+11:00) Magadan</option>
                  <option value="New Caledonia">
                    (GMT+11:00) New Caledonia
                  </option>
                  <option value="Solomon Is.">(GMT+11:00) Solomon Is.</option>
                  <option value="Auckland">(GMT+12:00) Auckland</option>
                  <option value="Fiji">(GMT+12:00) Fiji</option>
                  <option value="Kamchatka">(GMT+12:00) Kamchatka</option>
                  <option value="Marshall Is.">(GMT+12:00) Marshall Is.</option>
                  <option value="Wellington">(GMT+12:00) Wellington</option>
                  <option value="Nuku'alofa">(GMT+13:00) Nuku'alofa</option>
                </select>
              </div>

              <div className="form_input d-flex align-items-center">
                <label htmlFor="curruncy_symbol">
                  Curruncy Symbol <sup style={{ color: "red" }}>*</sup>
                </label>
                {/* <input
                className="inp"
                type="text"
                value={inpval.curruncy_symbol}
                onChange={setVal}
                name="curruncy_symbol"
                id="curruncy_symbol"
                placeholder="Enter curruncy_symbol..."
              /> */}
                <select
                  class="form-select currency"
                  id="currency"
                  value={inpval.curruncy_symbol}
                  onChange={setVal}
                  name="curruncy_symbol"
                >
                  <option>select currency</option>
                  <option value="AFN">Afghan Afghani</option>
                  <option value="ALL">Albanian Lek</option>
                  <option value="DZD">Algerian Dinar</option>
                  <option value="AOA">Angolan Kwanza</option>
                  <option value="ARS">Argentine Peso</option>
                  <option value="AMD">Armenian Dram</option>
                  <option value="AWG">Aruban Florin</option>
                  <option value="AUD">Australian Dollar</option>
                  <option value="AZN">Azerbaijani Manat</option>
                  <option value="BSD">Bahamian Dollar</option>
                  <option value="BHD">Bahraini Dinar</option>
                  <option value="BDT">Bangladeshi Taka</option>
                  <option value="BBD">Barbadian Dollar</option>
                  <option value="BYR">Belarusian Ruble</option>
                  <option value="BEF">Belgian Franc</option>
                  <option value="BZD">Belize Dollar</option>
                  <option value="BMD">Bermudan Dollar</option>
                  <option value="BTN">Bhutanese Ngultrum</option>
                  <option value="BTC">Bitcoin</option>
                  <option value="BOB">Bolivian Boliviano</option>
                  <option value="BAM">
                    Bosnia-Herzegovina Convertible Mark
                  </option>
                  <option value="BWP">Botswanan Pula</option>
                  <option value="BRL">Brazilian Real</option>
                  <option value="GBP">British Pound Sterling</option>
                  <option value="BND">Brunei Dollar</option>
                  <option value="BGN">Bulgarian Lev</option>
                  <option value="BIF">Burundian Franc</option>
                  <option value="KHR">Cambodian Riel</option>
                  <option value="CAD">Canadian Dollar</option>
                  <option value="CVE">Cape Verdean Escudo</option>
                  <option value="KYD">Cayman Islands Dollar</option>
                  <option value="XOF">CFA Franc BCEAO</option>
                  <option value="XAF">CFA Franc BEAC</option>
                  <option value="XPF">CFP Franc</option>
                  <option value="CLP">Chilean Peso</option>
                  <option value="CNY">Chinese Yuan</option>
                  <option value="COP">Colombian Peso</option>
                  <option value="KMF">Comorian Franc</option>
                  <option value="CDF">Congolese Franc</option>
                  <option value="CRC">Costa Rican ColÃ³n</option>
                  <option value="HRK">Croatian Kuna</option>
                  <option value="CUC">Cuban Convertible Peso</option>
                  <option value="CZK">Czech Republic Koruna</option>
                  <option value="DKK">Danish Krone</option>
                  <option value="DJF">Djiboutian Franc</option>
                  <option value="DOP">Dominican Peso</option>
                  <option value="XCD">East Caribbean Dollar</option>
                  <option value="EGP">Egyptian Pound</option>
                  <option value="ERN">Eritrean Nakfa</option>
                  <option value="EEK">Estonian Kroon</option>
                  <option value="ETB">Ethiopian Birr</option>
                  <option value="EUR">Euro</option>
                  <option value="FKP">Falkland Islands Pound</option>
                  <option value="FJD">Fijian Dollar</option>
                  <option value="GMD">Gambian Dalasi</option>
                  <option value="GEL">Georgian Lari</option>
                  <option value="DEM">German Mark</option>
                  <option value="GHS">Ghanaian Cedi</option>
                  <option value="GIP">Gibraltar Pound</option>
                  <option value="GRD">Greek Drachma</option>
                  <option value="GTQ">Guatemalan Quetzal</option>
                  <option value="GNF">Guinean Franc</option>
                  <option value="GYD">Guyanaese Dollar</option>
                  <option value="HTG">Haitian Gourde</option>
                  <option value="HNL">Honduran Lempira</option>
                  <option value="HKD">Hong Kong Dollar</option>
                  <option value="HUF">Hungarian Forint</option>
                  <option value="ISK">Icelandic KrÃ³na</option>
                  <option value="INR">Indian Rupee</option>
                  <option value="IDR">Indonesian Rupiah</option>
                  <option value="IRR">Iranian Rial</option>
                  <option value="IQD">Iraqi Dinar</option>
                  <option value="ILS">Israeli New Sheqel</option>
                  <option value="ITL">Italian Lira</option>
                  <option value="JMD">Jamaican Dollar</option>
                  <option value="JPY">Japanese Yen</option>
                  <option value="JOD">Jordanian Dinar</option>
                  <option value="KZT">Kazakhstani Tenge</option>
                  <option value="KES">Kenyan Shilling</option>
                  <option value="KWD">Kuwaiti Dinar</option>
                  <option value="KGS">Kyrgystani Som</option>
                  <option value="LAK">Laotian Kip</option>
                  <option value="LVL">Latvian Lats</option>
                  <option value="LBP">Lebanese Pound</option>
                  <option value="LSL">Lesotho Loti</option>
                  <option value="LRD">Liberian Dollar</option>
                  <option value="LYD">Libyan Dinar</option>
                  <option value="LTL">Lithuanian Litas</option>
                  <option value="MOP">Macanese Pataca</option>
                  <option value="MKD">Macedonian Denar</option>
                  <option value="MGA">Malagasy Ariary</option>
                  <option value="MWK">Malawian Kwacha</option>
                  <option value="MYR">Malaysian Ringgit</option>
                  <option value="MVR">Maldivian Rufiyaa</option>
                  <option value="MRO">Mauritanian Ouguiya</option>
                  <option value="MUR">Mauritian Rupee</option>
                  <option value="MXN">Mexican Peso</option>
                  <option value="MDL">Moldovan Leu</option>
                  <option value="MNT">Mongolian Tugrik</option>
                  <option value="MAD">Moroccan Dirham</option>
                  <option value="MZM">Mozambican Metical</option>
                  <option value="MMK">Myanmar Kyat</option>
                  <option value="NAD">Namibian Dollar</option>
                  <option value="NPR">Nepalese Rupee</option>
                  <option value="ANG">Netherlands Antillean Guilder</option>
                  <option value="TWD">New Taiwan Dollar</option>
                  <option value="NZD">New Zealand Dollar</option>
                  <option value="NIO">Nicaraguan CÃ³rdoba</option>
                  <option value="NGN">Nigerian Naira</option>
                  <option value="KPW">North Korean Won</option>
                  <option value="NOK">Norwegian Krone</option>
                  <option value="OMR">Omani Rial</option>
                  <option value="PKR">Pakistani Rupee</option>
                  <option value="PAB">Panamanian Balboa</option>
                  <option value="PGK">Papua New Guinean Kina</option>
                  <option value="PYG">Paraguayan Guarani</option>
                  <option value="PEN">Peruvian Nuevo Sol</option>
                  <option value="PHP">Philippine Peso</option>
                  <option value="PLN">Polish Zloty</option>
                  <option value="QAR">Qatari Rial</option>
                  <option value="RON">Romanian Leu</option>
                  <option value="RUB">Russian Ruble</option>
                  <option value="RWF">Rwandan Franc</option>
                  <option value="SVC">Salvadoran ColÃ³n</option>
                  <option value="WST">Samoan Tala</option>
                  <option value="SAR">Saudi Riyal</option>
                  <option value="RSD">Serbian Dinar</option>
                  <option value="SCR">Seychellois Rupee</option>
                  <option value="SLL">Sierra Leonean Leone</option>
                  <option value="SGD">Singapore Dollar</option>
                  <option value="SKK">Slovak Koruna</option>
                  <option value="SBD">Solomon Islands Dollar</option>
                  <option value="SOS">Somali Shilling</option>
                  <option value="ZAR">South African Rand</option>
                  <option value="KRW">South Korean Won</option>
                  <option value="XDR">Special Drawing Rights</option>
                  <option value="LKR">Sri Lankan Rupee</option>
                  <option value="SHP">St. Helena Pound</option>
                  <option value="SDG">Sudanese Pound</option>
                  <option value="SRD">Surinamese Dollar</option>
                  <option value="SZL">Swazi Lilangeni</option>
                  <option value="SEK">Swedish Krona</option>
                  <option value="CHF">Swiss Franc</option>
                  <option value="SYP">Syrian Pound</option>
                  <option value="STD">São Tomé and Príncipe Dobra</option>
                  <option value="TJS">Tajikistani Somoni</option>
                  <option value="TZS">Tanzanian Shilling</option>
                  <option value="THB">Thai Baht</option>
                  <option value="TOP">Tongan pa'anga</option>
                  <option value="TTD">Trinidad & Tobago Dollar</option>
                  <option value="TND">Tunisian Dinar</option>
                  <option value="TRY">Turkish Lira</option>
                  <option value="TMT">Turkmenistani Manat</option>
                  <option value="UGX">Ugandan Shilling</option>
                  <option value="UAH">Ukrainian Hryvnia</option>
                  <option value="AED">United Arab Emirates Dirham</option>
                  <option value="UYU">Uruguayan Peso</option>
                  <option value="USD">US Dollar</option>
                  <option value="UZS">Uzbekistan Som</option>
                  <option value="VUV">Vanuatu Vatu</option>
                  <option value="VEF">Venezuelan BolÃ­var</option>
                  <option value="VND">Vietnamese Dong</option>
                  <option value="YER">Yemeni Rial</option>
                  <option value="ZMK">Zambian Kwacha</option>
                </select>
              </div>

              <div className="form_input d-flex align-items-center">
                <label htmlFor="financial_year">
                  Financial Year <sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  className="inp"
                  type="date"
                  value={inpval.financial_year}
                  onChange={setVal}
                  name="financial_year"
                  id="financial_year"
                  placeholder="Enter financial_year..."
                />
              </div>

              <div className="form_heading">
                <h3 className="head">Company Logo</h3>
                <p className="cont">
                  Upload your orgnaization logo to make this space your own.
                </p>
              </div>
              <div className="form_input d-flex align-items-center">
                <input type="file" onChange={handleFileInputChange} />
                {file && (
                  <div>
                    <img
                      className="img"
                      src={URL.createObjectURL(file)}
                      alt="preview"
                    />
                  </div>
                )}
              </div>

              <button className="btn" onClick={addUserdata} disabled={loading}>
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Loading... &nbsp;
                    <CircularProgress />
                  </Box>
                ) : (
                  "Add your company details"
                )}
              </button>
            </form>
            <ToastContainer />
          </div>
        </section>
      </>
    </SideBar>
  );
};

export default Company;
