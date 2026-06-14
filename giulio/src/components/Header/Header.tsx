const Header = () => {
  return (
    <div className="header">
      <h1>Il compleanno di Giulio</h1>
      <img className="rounded-50 giulio-image" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2RoZmFjYWRvYzllMnJxNnI4bmxna3g3aXBtcDA5bHFhZnVkdmVxcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11vVUnbjUONl3q/giphy.gif" alt="Giulio" />
      <p className="m-5">
        Giulio compie 2 anni! Siamo felici di invitarvi a festeggiare insieme
        questo giorno speciale.
        <br/>  📅 <span className="fw-bold">Data:</span> 22 giugno
        <br/>  🕕 <span className="fw-bold">Ora: </span> 18:00
        <br/>  📍 <span className="fw-bold">Luogo:</span> a casa nostra, Via Simeto 13
        <br/>
        Vi aspettiamo per trascorrere una serata di giochi, sorrisi
        e tanto divertimento insieme al nostro piccolo Giulio! Non mancate! 💙
      </p>
    </div>
  );
};

export default Header;
