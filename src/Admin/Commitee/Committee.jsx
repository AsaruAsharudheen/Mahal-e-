import AdminFooter from '../AdminFooter/adminfooter';
import AdminNavbar from '../AdminNavbar/adminnavbar';
import './committee.css';

const Committee = () => {
  const committee = {
    president: {
      role: 'President',
      name: 'Abdul Rahman',
      phone: '9876543210',
      address: 'Palakkad, Kerala',
      photo: '/images/president.jpg',
    },
    secretary: {
      role: 'Secretary',
      name: 'Mohammed Ashraf',
      phone: '9876543211',
      address: 'Thrissur, Kerala',
      photo: '/images/secretary.jpg',
    },
    treasurer: {
      role: 'Treasurer',
      name: 'Musthafa',
      phone: '9876543212',
      address: 'Kozhikode, Kerala',
      photo: '/images/treasurer.jpg',
    },
    jointSecretaries: [
      {
        role: 'Joint Secretary',
        name: 'Faisal',
        phone: '9876543213',
        address: 'Malappuram, Kerala',
        photo: '/images/joint1.jpg',
      },
      {
        role: 'Joint Secretary',
        name: 'Shahid',
        phone: '9876543214',
        address: 'Kannur, Kerala',
        photo: '/images/joint2.jpg',
      },
            {
        role: 'Joint Secretary',
        name: 'Faisal',
        phone: '9876543213',
        address: 'Malappuram, Kerala',
        photo: '/images/joint1.jpg',
      },
      {
        role: 'Joint Secretary',
        name: 'Anas',
        phone: '9876543215',
        address: 'Ernakulam, Kerala',
        photo: '/images/joint3.jpg',
      },
    ],
    members: [
      {
        role: 'Member',
        name: 'Haris',
        phone: '9876543216',
        address: 'Kottayam, Kerala',
        photo: '/images/member1.jpg',
      },
      {
        role: 'Member',
        name: 'Junaid',
        phone: '9876543217',
        address: 'Alappuzha, Kerala',
        photo: '/images/member2.jpg',
      },
      {
        role: 'Member',
        name: 'Suhail',
        phone: '9876543218',
        address: 'Wayanad, Kerala',
        photo: '/images/member3.jpg',
      },
            {
        role: 'Member',
        name: 'Junaid',
        phone: '9876543217',
        address: 'Alappuzha, Kerala',
        photo: '/images/member2.jpg',
      },
    ],
  };

  return (
    <>
      <AdminNavbar />
      <div className="committee-container">
        <h2 className="committee-title">Our Committee</h2>

        {/* Top 3 roles */}
        <div className="committee-top">
          <div className="committee-card">
            <img
              src={committee.president.photo}
              alt={committee.president.name}
            />
            <h3>{committee.president.role}</h3>
            <p className="name">{committee.president.name}</p>
            <p>{committee.president.address}</p>
            <p>📞 {committee.president.phone}</p>
          </div>
          <div className="committee-card">
            <img
              src={committee.secretary.photo}
              alt={committee.secretary.name}
            />
            <h3>{committee.secretary.role}</h3>
            <p className="name">{committee.secretary.name}</p>
            <p>{committee.secretary.address}</p>
            <p>📞 {committee.secretary.phone}</p>
          </div>
          <div className="committee-card">
            <img
              src={committee.treasurer.photo}
              alt={committee.treasurer.name}
            />
            <h3>{committee.treasurer.role}</h3>
            <p className="name">{committee.treasurer.name}</p>
            <p>{committee.treasurer.address}</p>
            <p>📞 {committee.treasurer.phone}</p>
          </div>
        </div>

        {/* Joint Secretaries */}
        <h3 className="section-title">Joint Secretaries</h3>
        <div className="committee-grid">
          {committee.jointSecretaries.map((person, index) => (
            <div className="committee-card" key={index}>
              <img src={person.photo} alt={person.name} />
              <h3>{person.role}</h3>
              <p className="name">{person.name}</p>
              <p>{person.address}</p>
              <p>📞 {person.phone}</p>
            </div>
          ))}
        </div>

        {/* Members */}
        <h3 className="section-title">Members</h3>
        <div className="committee-grid">
          {committee.members.map((person, index) => (
            <div className="committee-card" key={index}>
              <img src={person.photo} alt={person.name} />
              <h3>{person.role}</h3>
              <p className="name">{person.name}</p>
              <p>{person.address}</p>
              <p>📞 {person.phone}</p>
            </div>
          ))}
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default Committee;
