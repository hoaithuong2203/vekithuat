import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const defaultAvatar = process.env.PUBLIC_URL + '/avatar-trang-1.jpg';
  const defaultFrontCccdImage = process.env.PUBLIC_URL + '/mattruoc.jpg';
  const defaultBackCccdImage = process.env.PUBLIC_URL + '/matsau.jpg';
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState(0);
  const [dob, setDob] = useState('');
  const [bornIn, setBornIn] = useState('');
  const [userImgUrl, setUserImgUrl] = useState({
    file: null,
    url: defaultAvatar,
  });
  const [cccd, setCccd] = useState('');
  const [confirmCccd, setConfirmCccd] = useState('');
  const [cccdIssueDate, setCccdIssueDate] = useState('');
  const [issuedBy, setIssuedBy] = useState('');
  const [frontCccdImgUrl, setFrontCccdImgUrl] = useState({
    file: null,
    url: defaultFrontCccdImage,
  });
  const [backCccdImgUrl, setBackCccdImgUrl] = useState({
    file: null,
    url: defaultBackCccdImage,
  });
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirmMobileNumber, setConfirmMobileNumber] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [recipientFullName, setRecipientFullName] = useState('');
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
  const [parentMobileNumber, setParentMobileNumber] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    console.log('eeeee', e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleBornInChange = (e) => {
    setBornIn(e.target.value);
  };

  const handleCccdChange = (e) => {
    setCccd(e.target.value);
  };

  const handleConfirmCccdChange = (e) => {
    setConfirmCccd(e.target.value);
  };

  const handleCccdIssueDateChange = (e) => {
    setCccdIssueDate(e.target.value);
  };

  const handleIssuedByChange = (e) => {
    setIssuedBy(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleConfirmMobileNumberChange = (e) => {
    setConfirmMobileNumber(e.target.value);
  };

  const handlePermanentAddressChange = (e) => {
    setPermanentAddress(e.target.value);
  };

  const handleRecipientFullNameChange = (e) => {
    setRecipientFullName(e.target.value);
  };

  const handleRecipientPhoneNumberChange = (e) => {
    setRecipientPhoneNumber(e.target.value);
  };

  const handleParentMobileNumberChange = (e) => {
    setParentMobileNumber(e.target.value);
  };

  const handleGraduationYearChange = (e) => {
    setGraduationYear(e.target.value);
  };

  const handleRecipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const readURL = (e, setImageUrl) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl((pre) => ({ ...pre, file: e.target.files[0], url: reader.result }));
        console.log('e.target.files[0]', reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUserImgUpload = (e) => {
    readURL(e, setUserImgUrl);
  };

  const handleFrontCccdImgUpload = (e) => {
    readURL(e, setFrontCccdImgUrl);
  };

  const handleBackCccdImgUpload = (e) => {
    readURL(e, setBackCccdImgUrl);
  };

  const handlePaymentSdo = async (e) => {
    e.preventDefault();

    try {
      // Gọi API thanh toán ở đây
      const data = {
        amount: 400000,
        no: cccd,
      };
      const response = await axios.get('http://127.0.0.1:8000/api/v1/payment/return', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.status !== 'OK') {
        throw new Error('Payment failed');
      }
      console.log('Payment successful:', response.data);

      window.open(response.data.url, '_blank');

      // Xử lý sau khi thanh toán thành công, ví dụ: chuyển hướng người dùng đến trang xác nhận thanh toán

      alert('Đã thanh toán thành công!');
    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
      alert('Thanh toán thất bại. Vui lòng thử lại sau.');
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // Gọi API thanh toán ở đây
      const data = {
        amount: 400000,
        no: cccd,
      };
      const response = await axios.post('http://127.0.0.1:8000/api/v1/payment/create', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.status !== 'OK') {
        throw new Error('Payment failed');
      }
      console.log('Payment successful:', response.data);

      window.open(response.data.url, '_blank');

      // Xử lý sau khi thanh toán thành công, ví dụ: chuyển hướng người dùng đến trang xác nhận thanh toán
      alert('Đã thanh toán thành công!');
    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
      alert('Thanh toán thất bại. Vui lòng thử lại sau.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('fullName', fullName);
    data.append('gender', gender);
    data.append('dateOfBirth', dob);
    data.append('birthPlace', bornIn);
    data.append('identifyNo', cccd);
    data.append('confirmCccd', confirmCccd);
    data.append('issueDate', cccdIssueDate);
    data.append('issuePlace', issuedBy);
    data.append('email', email);
    data.append('confirmEmail', confirmEmail);
    data.append('phoneNumber', mobileNumber);
    data.append('confirmMobileNumber', confirmMobileNumber);
    data.append('placeOfPermanent', permanentAddress);
    data.append('receiverName', recipientFullName);
    data.append('receiverPhone', recipientPhoneNumber);
    data.append('parentPhone', parentMobileNumber);
    data.append('graduationYear', graduationYear);
    data.append('receiverAddress', recipientAddress);
    data.append('amount', '400000');
    data.append('image', userImgUrl.file);
    data.append('frontImage', frontCccdImgUrl.file);
    data.append('backImage', backCccdImgUrl.file);
    console.log(data);

    data.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Registration successful!', response.data);
      if (response.data.status !== 'OK') {
        throw new Error('Payment failed');
      }
      console.log('Payment successful:', response.data);

      window.open(response.data.url, '_blank');
      // Xử lý sau khi thanh toán thành công, ví dụ: chuyển hướng người dùng đến trang xác nhận thanh toán
      // alert('Đã thanh toán thành công!');
      setPaymentSuccess(true);
      // Xử lý các bước tiếp theo sau khi đăng ký thành công
    } catch (error) {
      console.error('Registration failed!', error);
      // Xử lý lỗi nếu đăng ký không thành công
    }
  };
  if (paymentSuccess) {
    return <Redirect to="/" />;
  }

  // useEffect(() => {
  //   // Thực hiện fetch dữ liệu từ API khi component được mount
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get('http://localhost:3001/api/v1/auth/register');
  //       setData(response.data);
  //     } catch (error) {
  //       console.log('Failed to fetch data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="main-content">
      <div className="form-group">
        <label>Ảnh Đăng ký dự thi</label>
        <div className="image-upload-container">
          <div className="image-input">
            <input
              autoFocus
              className="form-control"
              required
              accept="image/*, img/*"
              placeholder="Họ tên *"
              name="imgstudent"
              type="file"
              onChange={handleUserImgUpload}
            />
            <img className="img_user" src={userImgUrl.url} id="userImg" alt="User" />
          </div>
        </div>
        <div className="additional-text">
          <p>
            - ảnh chụp kiểu Căn cước công dân, nền xanh, chụp trong 6 tháng gần đây (dùng làm thẻ dự thi và kiểm
            tra khi trúng tuyển);
            <br />- Kích thước theo chuẩn 3x4 (113x151 pixel).
          </p>
        </div>
      </div>
      <div className="flex-container">
        <div className="form-group">
          <label>Họ và tên *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-user"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Họ tên *"
              name="FullName"
              type="text"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Giới tính *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-user"></i>
            </span>
            <select
              className="form-control"
              id="inputGroupSelect01"
              name="Gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Ngày/Tháng/Năm sinh *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-calendar"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Ngày tháng năm sinh *"
              id="StrDob"
              name="StrDob"
              type="date"
              value={dob}
              onChange={handleDobChange}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Nơi sinh *</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-map-marker"></i>
          </span>
          <textarea
            autoComplete="off"
            className="form-control"
            required
            placeholder="Ghi tên tỉnh thành nơi sinh. Ví dụ: Hà Nội*"
            rows="2"
            type="text"
            name="BornIn"
            value={bornIn}
            onChange={handleBornInChange}
          ></textarea>
        </div>
        <div id="divNoiSinh"></div>
      </div>
      <div className="flex-container">
        <div className="form-group">
          <label>Số CCCD *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-id-card"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Số CCCD *"
              name="Cccd"
              type="text"
              value={cccd}
              onChange={handleCccdChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Nhập lại Số CCCD *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-id-card"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Nhập lại Số CCCD *"
              name="ConfirmCccd"
              type="text"
              value={confirmCccd}
              onChange={handleConfirmCccdChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Ngày cấp CCCD *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-calendar"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Ngày cấp CCCD *"
              name="CccdIssueDate"
              type="date"
              value={cccdIssueDate}
              onChange={handleCccdIssueDateChange}
            />
          </div>
        </div>
      </div>
      <div className="flex-container">
        <div className="form-group">
          <label>Nơi cấp *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-map-marker"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Nơi cấp *"
              name="IssuedBy"
              type="text"
              value={issuedBy}
              onChange={handleIssuedByChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Mặt trước CCCD *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-image"></i>
            </span>
            <input
              className="form-control"
              required
              accept="image/*, img/*"
              name="frontCccdImg"
              type="file"
              onChange={handleFrontCccdImgUpload}
            />
          </div>
          {frontCccdImgUrl ? (
            <img className="img_cccd" src={frontCccdImgUrl.url} alt="Front CCCD" />
          ) : (
            <img className="img_cccd default-img" src={defaultFrontCccdImage} alt="Default Front CCCD" />
          )}
        </div>

        <div className="form-group">
          <label>Mặt sau CCCD *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-image"></i>
            </span>
            <input
              className="form-control"
              required
              accept="image/*, img/*"
              name="backCccdImg"
              type="file"
              onChange={handleBackCccdImgUpload}
            />
          </div>
          {console.log('imageeee', backCccdImgUrl.url)}
          {backCccdImgUrl ? (
            <img className="img_cccd" src={backCccdImgUrl.url} alt="Back CCCD" />
          ) : (
            <img className="img_cccd default-img" src={defaultBackCccdImage} alt="Default Back CCCD" />
          )}
        </div>
      </div>
      <p className="additional-text">
        - Phải nhập chính xác số CCCD vì sẽ được dùng làm tài khoản đăng nhập;
        <br />- Hình CCCD tải lên có kích thước lớn hơn hoặc bằng 350px.
      </p>
      <div className="flex-container">
        <div className="form-group">
          <label>Email *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Email *"
              name="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Nhập lại Email *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Nhập lại Email *"
              name="ConfirmEmail"
              type="email"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
            />
          </div>
        </div>
      </div>
      <div className="flex-container">
        <div className="form-group">
          <label>Số điện thoại di động *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-phone"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Số điện thoại di động *"
              name="MobileNumber"
              type="tel"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Nhập lại Số điện thoại di động *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-phone"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Nhập lại Số điện thoại di động *"
              name="ConfirmMobileNumber"
              type="tel"
              value={confirmMobileNumber}
              onChange={handleConfirmMobileNumberChange}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Hộ khẩu thường trú *</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-home"></i>
          </span>
          <input
            className="form-control"
            required
            placeholder="Hộ khẩu thường trú *"
            name="PermanentAddress"
            type="text"
            value={permanentAddress}
            onChange={handlePermanentAddressChange}
          />
        </div>
      </div>
      <div className="flex-container">
        <div className="form-group">
          <label>Họ và tên người nhận tin *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-user"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Họ và tên người nhận tin *"
              name="RecipientFullName"
              type="text"
              value={recipientFullName}
              onChange={handleRecipientFullNameChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Số điện thoại người nhận tin *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-phone"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Số điện thoại người nhận tin *"
              name="RecipientPhoneNumber"
              type="tel"
              value={recipientPhoneNumber}
              onChange={handleRecipientPhoneNumberChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Điện thoại di động của bố/mẹ *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-phone"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Điện thoại di động của bố/mẹ *"
              name="ParentMobileNumber"
              type="text"
              value={parentMobileNumber}
              onChange={handleParentMobileNumberChange}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Địa chỉ người nhận tin *</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-map-marker"></i>
          </span>
          <textarea
            autoComplete="off"
            className="form-control"
            required
            placeholder="Địa chỉ người nhận tin *"
            rows="2"
            type="text"
            name="RecipientAddress"
            value={recipientAddress}
            onChange={handleRecipientAddressChange}
          ></textarea>
        </div>
      </div>
      <div className="flex-container">
        <div className="form-group">
          <label>Năm tốt nghiệp *</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-graduation-cap"></i>
            </span>
            <input
              className="form-control"
              required
              placeholder="Năm tốt nghiệp *"
              name="GraduationYear"
              type="text"
              value={graduationYear}
              onChange={handleGraduationYearChange}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-custom"
          onClick={handleSubmit}
          style={{
            backgroundColor: '#002a5c',
            color: 'white',
            borderRadius: '5px',
            width: '200px',
            height: '80px',
            marginBottom: '20px',
          }}
        >
          Thanh Toán Lệ Phí Thi
        </button>
      </div>
      <div className="image-note"></div>

      {/* <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: '#002a5c', color: 'white' }}
          onClick={handleSubmit}
        >
          Lưu và Xác nhận Đăng ký
        </button>
      </div> */}
    </div>
  );
};

export default Register;
