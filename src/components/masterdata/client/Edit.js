import React from 'react';
import { connect } from "react-redux";
import { reduxForm, initialize } from 'redux-form';

class Edit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };

    this.onSubmitClick = this.onSubmitClick.bind(this);
  }


  componentWillMount() {
    this.props.dispatch(initialize('masterdataclientadd', {
      name: 'test'
    }, ['name', 'address', 'phone']));
  }

  onSubmitClick(e) {
    console.log('Submission received!', e);
  }

  render() {
    const { fields: {name, address, phone}, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" {...name}/>
        {/* {name.error && name.touched && <div>{name.error}</div>} */}

        <label>Address</label>
        <input type="text" {...address} />
        {/* {address.error && address.touched && <div>{address.error}</div>} */}

        <label>Phone</label>
        <input type="text" {...phone}/>
        {/* {phone.error && phone.touched && <div>{phone.error}</div>} */}

        <button onClick={this.onSubmitClick}>Submit</button>
      </form>
    );
  }
}

// Edit = reduxForm({
//   form: 'masterdataclientadd',                      // the name of your form and the key to
//                                         // where your form's state will be mounted
//   fields: ['name', 'address', 'phone'], // a list of all your fields in your form
//   validate: ValidateAdd             // a synchronous validation function
// })(Edit);

export default connect()(Edit);
