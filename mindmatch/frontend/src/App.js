import React, { Component } from 'react';
import Modal from "./components/Modals";
import logo from './logo.svg';
import './App.css';
import axios from "axios";

// const authorItems = [
//   {
//       "id": 2,
//       "disciplines": [
//           "Computer Science"
//       ],
//       "topics": [
//           "Conformance testing",
//           "Natural language generation",
//           "Natural language processing",
//           "Parallel computing",
//           "Web application"
//       ],
//       "languages": [
//           "English"
//       ],
//       "country": [
//           "Hong Kong"
//       ],
//       "institution": [
//           "The University of Hong Kong"
//       ],
//       "first_name": "Ying Cheuk",
//       "last_name": "Hui",
//       "orcid_id": null,
//       "scopus_id": null,
//       "researcher_id": null,
//       "isni_id": null,
//       "email": null
//   },
//   {
//       "id": 3,
//       "disciplines": [
//           "Computer Science"
//       ],
//       "topics": [
//           "Conformance testing",
//           "Natural language generation",
//           "Natural language processing",
//           "Parallel computing",
//           "Web application"
//       ],
//       "languages": [
//           "English"
//       ],
//       "country": [
//           "Hong Kong"
//       ],
//       "institution": [
//           "The University of Hong Kong"
//       ],
//       "first_name": "Yin Hei",
//       "last_name": "Kong",
//       "orcid_id": null,
//       "scopus_id": null,
//       "researcher_id": null,
//       "isni_id": null,
//       "email": null
//   },
//   {
//       "id": 1,
//       "disciplines": [
//           "Computer Science"
//       ],
//       "topics": [
//           "Conformance testing",
//           "Natural language generation",
//           "Natural language processing",
//           "Parallel computing",
//           "Web application"
//       ],
//       "languages": [
//           "English"
//       ],
//       "country": [
//           "Hong Kong"
//       ],
//       "institution": [
//           "The University of Hong Kong"
//       ],
//       "first_name": "John",
//       "last_name": "Lee",
//       "orcid_id": null,
//       "scopus_id": null,
//       "researcher_id": null,
//       "isni_id": null,
//       "email": null
//   }
// ]

const paperItems = [
  {
      "id": 1,
      "disciplines": [
          "Computer Science"
      ],
      "topics": [
          "Conformance testing",
          "Natural language generation",
          "Natural language processing",
          "Parallel computing",
          "Web application"
      ],
      "authors": [
          {
              "id": 2,
              "disciplines": [
                  "Computer Science"
              ],
              "topics": [
                  "Conformance testing",
                  "Natural language generation",
                  "Natural language processing",
                  "Parallel computing",
                  "Web application"
              ],
              "languages": [
                  "English"
              ],
              "country": [
                  "Hong Kong"
              ],
              "institution": [
                  "The University of Hong Kong"
              ],
              "first_name": "Ying Cheuk",
              "last_name": "Hui",
              "orcid_id": null,
              "scopus_id": null,
              "researcher_id": null,
              "isni_id": null,
              "email": null
          },
          {
              "id": 3,
              "disciplines": [
                  "Computer Science"
              ],
              "topics": [
                  "Conformance testing",
                  "Natural language generation",
                  "Natural language processing",
                  "Parallel computing",
                  "Web application"
              ],
              "languages": [
                  "English"
              ],
              "country": [
                  "Hong Kong"
              ],
              "institution": [
                  "The University of Hong Kong"
              ],
              "first_name": "Yin Hei",
              "last_name": "Kong",
              "orcid_id": null,
              "scopus_id": null,
              "researcher_id": null,
              "isni_id": null,
              "email": null
          },
          {
              "id": 1,
              "disciplines": [
                  "Computer Science"
              ],
              "topics": [
                  "Conformance testing",
                  "Natural language generation",
                  "Natural language processing",
                  "Parallel computing",
                  "Web application"
              ],
              "languages": [
                  "English"
              ],
              "country": [
                  "Hong Kong"
              ],
              "institution": [
                  "The University of Hong Kong"
              ],
              "first_name": "John",
              "last_name": "Lee",
              "orcid_id": null,
              "scopus_id": null,
              "researcher_id": null,
              "isni_id": null,
              "email": null
          }
      ],
      "languages": [
          "English"
      ],
      "title": "Knowledge-rich, computer-assisted composition of Chinese couplets",
      "abstract": "Recent research effort in poem composition has focused on the use of automatic language generation to produce a polished poem. A less explored question is how effectively a computer can serve as an interactive assistant to a poet. For this purpose, we built a web application that combines rich linguistic knowledge from classical Chinese philology with statistical natural language processing techniques. The application assists users in composing a ‘couplet’—a pair of lines in a traditional Chinese poem—by making suggestions for the next and corresponding characters. A couplet must meet a complicated set of requirements on phonology, syntax, and parallelism, which are challenging for an amateur poet to master. The application checks conformance to these requirements and makes suggestions for characters based on lexical, syntactic, and semantic properties. A distinguishing feature of the application is its extensive use of linguistic knowledge, enabling it to inform users of specific phonological principles in detail, and to explicitly model semantic parallelism, an essential characteristic of Chinese poetry. We evaluate the quality of poems composed solely with characters suggested by the application, and the coverage of its character suggestions.",
      "year": 2016,
      "doi": null,
      "pmid": null,
      "magid": null
  }
]

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewAuthors: true,
      viewPapers: false,
      activeItem: {
        first_name: "",
        last_name: "",
        email: "",
        orcid_id: "",
        scopus_id: "",
        researcher_id: "",
        isni_id: ""
      },
      authorList: [],
      paperList: paperItems
    };

    this.handleAuthorDisplayToggle = this.handleAuthorDisplayToggle.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/authors/")
      .then(res => this.setState({ authorList: res.data }))
      .catch(err => console.log(err));
  };

  displayAuthors = status => {
    if(status) {
      return this.setState({viewAuthors: true});
    }
    return this.setState({viewAuthors: false});
  }

  // displayPapers = status => {
  //   if(status) {
  //     return this.setState({viewPapers: true});
  //   }
  //   return this.setState({viewPapers: false});    
  // }

  

  handleAuthorDisplayToggle() {
    this.setState(state => ({
      viewAuthors: !state.viewAuthors
    }));

    console.log(this.state.viewAuthors)
  }

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={this.handleAuthorDisplayToggle}
          className={this.state.viewAuthors ? "active" : ""}
        >
          Authors
        </span>
        {/* <span
          onClick={() => this.displayPapers(true)}
          className={this.state.viewAuthors ? "" : "active"}
          className={this.state.viewPapers ? "active" : ""}
        >
          Papers
        </span> */}
      </div>
    );
  };

  renderItems = () => {
    //const { viewAuthors } = this.state;
    // const newItems = {this.state.viewAuthors ? this.state.authorList : null}
    // );

    const newItems = null;

    console.log(this.state.viewAuthors)

    if (this.state.viewAuthors) {
      const newItems = this.state.authorList
      console.log(newItems)

      console.log("show authors")
      return newItems.map(item => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`author-title mr-2 ${
              this.state.viewAuthors ? "authors" : ""
            }`}
            title={item.last_name + ", " + item.first_name}
          >
            {item.last_name + ", " + item.first_name}
          </span>
          <span>
            <button
                onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete
              </button>
          </span>
        </li>
      ));

    }
    
  };
  
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/authors/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/authors/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/authors/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Authors</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">Add author</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
