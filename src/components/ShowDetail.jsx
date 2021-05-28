import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import uniqid from 'uniqid'

class ShowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            Movie: {},
            comments: []
        }
    }

    componentDidMount() {
        let idFromTheURLBar = this.props.match.params.movieId.toString()
        console.log('idFromTheURLBar:', idFromTheURLBar)
        this.fetchMovie(idFromTheURLBar)
        this.fetchComments(idFromTheURLBar)
    }

    // url = "https://www.omdbapi.com/?apikey=c71a553d";
    url = "https://app-netflix-backend.herokuapp.com/medias";

    fetchMovie = async (idFromTheURLBar) => {
        try {
            let response = await fetch(`${this.url}&i=${idFromTheURLBar}`)
            if (response.ok) {
                let data = await response.json()
                console.log("data", data)
                this.setState({ Movie: data })
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
            this.setState({ isError: true, isLoading: false })
        }
    }


    fetchComments = async (movieID) => {
        const commentsUrl = "https://striveschool-api.herokuapp.com/api/comments/";
        const comments = await fetch(commentsUrl + movieID, {
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDkyYjUyYTAyNTNhYTAwMTU5NjRhNTkiLCJpYXQiOjE2MjE1ODE1MTMsImV4cCI6MTYyMjc5MTExM30.xX1bdh-kAI426pIAHwyGgERUwH-di9UXYWKK1-jFlvY",
            }
        }).then((response) => response.json());
        this.setState({ comments });
        console.log('this.state.comments:', this.state.comments)
    };


    render() {
        return (
            <Container >
                <Row className="justify-content-center">
                    <h1 className="text-white">ShowDetail</h1>
                </Row>
                <Row className="justify-content-center">
                    {this.state.Movie && (
                        <div>
                            <img src={this.state.Movie.Poster} alt={this.state.Movie.Title} />
                            <div className="text-white text-center">{this.state.Movie.Title}</div>
                            {this.state.comments.map((comment) => (
                                <div className="text-white" key={uniqid()}>
                                    <hr />
                                    {comment.comment}
                                    <div className="text-white">Rate: {comment.rate} </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Row>
            </Container>
        );
    }
}

export default ShowDetail;