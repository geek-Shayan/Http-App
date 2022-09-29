import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import httpService from "./services/httpService";
import config from "./config.json"
import "react-toastify/dist/ReactToastify.css"
import "./App.css";


// const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    // pending > resolved (success) OR rejected (failure)
    // const promise = httpService.get("https://jsonplaceholder.typicode.com/posts");
    // console.log(promise);
    // promise.then();
    // const response = await promise;
    // const response = await httpService.get("https://jsonplaceholder.typicode.com/posts");
    // console.log(response);

    // const { data: posts } = await httpService.get(apiEndpoint);
    const { data: posts } = await httpService.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    console.log("Add");
    const obj = { title: "a", body: "b" };
    // const { data: post } = await httpService.post(apiEndpoint, obj);
    const { data: post } = await httpService.post(config.apiEndpoint, obj);
    console.log(post);
  
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    console.log("Update", post);
    post.title = "UPDATED";
    await httpService.put(config.apiEndpoint + '/' + post.id, post); //put update all
    // const { data } = await httpService.put(config.apiEndpoint + '/' + post.id, post); //put update all
    // const { data } = await httpService.put(apiEndpoint + '/' + post.id, post); //put update all
    // const { data } = await httpService.patch(apiEndpoint + '/' + post.id, { title: post.title }); //patch update 1 or more
    // console.log(data);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({ posts });
  };

  handleDelete = async post => {
    console.log("Delete", post);
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    
    try {
      await httpService.delete(config.apiEndpoint + "/" + post.id);
      // await httpService.delete(apiEndpoint + "/" + post.id);
      // await httpService.delete(apiEndpoint + "/");  //404 error check
      // await httpService.delete("asduh" + apiEndpoint + "/" + post.id);  //unexpected error check
      // throw new Error('');  // fake error to check
    }
    catch (ex) {
      // ex.request
      // ex.response

      // Expected (404: not found, 400: bad request) - client errors
      // - Display a specific error message
      
      // Uneexpected (network down, server down, db down, bug)
      // - Log them
      // - Display a generic and friendly error message
      
      // console.log(ex);

      console.log("HANDLE DELETE CATCH BLOCK CALLED");

      if(ex.response && ex.response.status === 404) {
        // console.log("Logging the expected error.", ex);
        // alert("This post has already been deleted.");
        toast.error("This post has already been deleted.");
      }
      // else {
      //   console.log("Logging the unexpected error.", ex);
      //   alert("An unexpected error occurred.");
      // }

      // alert('Someying failed while deleting a post!');
      this.setState({ posts: originalPosts });
    }
    
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
