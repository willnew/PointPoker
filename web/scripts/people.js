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
      <div className="people-list">
        {personDom}
      </div>
    );
  }
});

ReactDOM.render(
  <PeopleList data={data} />,
  document.getElementsByClassName('people_list')[0]
);
