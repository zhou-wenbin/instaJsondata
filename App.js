import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";
import axios from 'axios';
import Gallery from 'react-grid-gallery';
class App extends Component {

  constructor() {
    super();
    this.state = {
     email: "",
     fullname: "",
     posts: "",
     fetchUrl:"",
     results:[],
     tags:[],
     like_number:[],
      IMAGES :[]

    };
  }

  componentDidMount() {
   
    axios.get(`https://www.instagram.com/explore/tags/kodawarin/?__a=1&page=0`)
      .then(res => {
        console.log(res)

        var tmp_results =[]
        for(var i=0 ;i<res.data.graphql.hashtag.edge_hashtag_to_media.edges.length;i++){
          tmp_results[i] =!!res.data.graphql&&res.data.graphql.hashtag.edge_hashtag_to_media.edges[i].node.thumbnail_src
          console.log(tmp_results[i])

        }
        var tmp_tags =[]
        for(var i=0 ;i<res.data.graphql.hashtag.edge_hashtag_to_media.edges.length;i++){
          tmp_tags[i] =!!res.data.graphql&&!!res.data.graphql.hashtag.edge_hashtag_to_media.edges[i].node.edge_media_to_caption.edges[0]&&res.data.graphql.hashtag.edge_hashtag_to_media.edges[i].node.edge_media_to_caption.edges[0].node.text
          console.log(!!tmp_tags[i]&&tmp_tags[i].split("\#"))

        }
        var tmp_likes=[]
        for(var i=0 ;i<res.data.graphql.hashtag.edge_hashtag_to_media.edges.length;i++){
          tmp_likes[i] =!!res.data.graphql&&res.data.graphql.hashtag.edge_hashtag_to_media.edges[i].node.edge_liked_by.count
          console.log(tmp_likes[i])
        };
        var fetchUrl = !!res.data.graphql&&res.data.graphql.hashtag.edge_hashtag_to_media.edges[0].node.thumbnail_src
    this.setState({ fetchUrl:fetchUrl,posts :res.data, results:tmp_results,tags:tmp_tags,like_number:tmp_likes})
     
      });  
  }


  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });




    var resLength =this.state.results.length;
    var resLength_tags=this.state.tags.length;
    var isResult = resLength > 0
    var isTag = resLength_tags >0
    if(isResult && isTag){
      var setDoc = db.collection('data')
      var IMAGES=[]
      for(var i=0;i<resLength;i++){
        var data = {
          fetchUrl:this.state.results[i],
          tags:this.state.tags[i].split("\#"),
          likes:this.state.like_number[i]
        };
        var dataForImages = {
          src:this.state.results[i],
          thumbnail: this.state.results[i],
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: true,
        caption: this.state.tags[i]
        };
        IMAGES[i]= dataForImages
        setDoc.doc("data-"+i).set(data)
      }
      this.setState({IMAGES})

      
  
  }
  // [END set_document]


    // const userRef = db.collection("test1") .doc('roomA')
    // .collection('messages').doc('message1');

    this.setState({
      fullname: "",
      email: ""
    });
  };
  render() {

    
    return (

      <div>

<form onSubmit={this.addUser}>
       <input
    type="text"
    name="fullname"
    placeholder="Full name"
    onChange={this.updateInput}
    value={this.state.fullname}
    
  />
  <input
    type="email"
    name="email"
    placeholder="Full name"
    onChange={this.updateInput}
    value={this.state.email}
  />



/>
  <input
    type="email"
    name="email"
    placeholder="Full name"
    onChange={this.updateInput}
    value={this.state.email}
  />


      <button type="submit">Submit</button>
    </form>
      <h1>{`${JSON.stringify(this.state.fetchUrl)}`}</h1>
      <img ref="image" src={this.state.fetchUrl} className="hidden" />
      <Gallery images={this.state.IMAGES}/>,

    </div>

    );
  }
}

export default App;



//http://localhost:3000/