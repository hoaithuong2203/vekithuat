// components/Admin.js
import React, { useState } from 'react';

const Admin = () => {
  const [contestants, setContestants] = useState([
    { id: 1, name: 'John Doe', gender: 'Male', dob: '1990-01-01', cccd: '123456789' },
    // Thêm thí sinh mẫu nếu cần
  ]);

  const [currentContestant, setCurrentContestant] = useState(null);
  const [formState, setFormState] = useState({ id: '', name: '', gender: '', dob: '', cccd: '' });

  const handleAddContestant = () => {
    setFormState({ id: '', name: '', gender: '', dob: '', cccd: '' });
    setCurrentContestant(null);
  };

  const handleEditContestant = (contestant) => {
    setFormState(contestant);
    setCurrentContestant(contestant);
  };

  const handleDeleteContestant = (id) => {
    setContestants(contestants.filter((contestant) => contestant.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentContestant) {
      setContestants(contestants.map((c) => (c.id === currentContestant.id ? formState : c)));
    } else {
      setContestants([...contestants, { ...formState, id: Date.now() }]);
    }
    setFormState({ id: '', name: '', gender: '', dob: '', cccd: '' });
    setCurrentContestant(null);
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Số CCCD</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contestants.map((contestant) => (
            <tr key={contestant.id}>
              <td>{contestant.id}</td>
              <td>{contestant.name}</td>
              <td>{contestant.gender}</td>
              <td>{contestant.dob}</td>
              <td>{contestant.cccd}</td>
              <td>
                <button onClick={() => handleEditContestant(contestant)}>Sửa</button>
                <button onClick={() => handleDeleteContestant(contestant.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{currentContestant ? 'Sửa thí sinh' : 'Thêm thí sinh'}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Tên:
          <input
            type="text"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Giới tính:
          <input
            type="text"
            value={formState.gender}
            onChange={(e) => setFormState({ ...formState, gender: e.target.value })}
          />
        </label>
        <br />
        <label>
          Ngày sinh:
          <input
            type="date"
            value={formState.dob}
            onChange={(e) => setFormState({ ...formState, dob: e.target.value })}
          />
        </label>
        <br />
        <label>
          Số CCCD:
          <input
            type="text"
            value={formState.cccd}
            onChange={(e) => setFormState({ ...formState, cccd: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">{currentContestant ? 'Lưu thay đổi' : 'Thêm thí sinh'}</button>
      </form>
    </div>
  );
};

export default Admin;
