/******************Start of People list Part**********************/
var data = [
  {name: "will liu", ip: "1.1.1.1", point: 5},
  {name: "cursoe xia", ip: "2.2.2.2", point: 3}
];

var Person=React.createClass({
  render: function() {
    return (
      <div className="person" data-id={this.props.data.ip}>
        <span>{this.props.data.name}</span>:
        <span>{this.props.data.point}</span>
      </div>
    );
  }
});

var PeopleList=React.createClass({
  render: function() {
    var personDom = this.props.data.map(function(person) {
      return (
        <Person data={person}></Person>
      );
    });
    return (
      <div className="col-md-4 people-list">
        {personDom}
      </div>
    );
  }
});
/******************End of People list Part**********************/


/******************Start of Poker panel Part**********************/
var PokerPanel=React.createClass({
  render: function() {
    return (
      <h1>{this.props.point}</h1>
    );
  }
});
/******************End of Poker panel Part**********************/

var MainPanel=React.createClass({
  getInitialState: function() {
    return {
      ip: '1.1.1.1',
      point: '5',
      resultStatus: 'NOT_DONE' 
    };
  },

  render: function() {
    return (
      <div>
        <div className="col-md-4">
          <PeopleList data={this.props.data} />
        </div>
        <div className="col-md-8">
          <PokerPanel point={this.state.point} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <MainPanel data={data} />,
  document.getElementById('content')
);
