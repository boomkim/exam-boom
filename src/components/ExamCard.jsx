import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import api from '../api'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';

// import { ExamCardSelect } from '../components'

class ExamCard extends Component {
    constructor(props) {
      super(props);
      this.viewAnswer = this.viewAnswer.bind(this);

      this.state = {
          question: "",
          choices: [],
          answer: [],
          choiceType: "",
          isLoading: false,
          answerState: false
      }



      // console.log(examNum);
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const examNum = this.props.value.match.params.id;

        await api.getExamById("adp", examNum).then(exam => {
          console.log(exam);
            this.setState({
                question: exam.data.Item.question,
                choices: exam.data.Item.choice,
                answer: exam.data.Item.answer,
                choiceType: exam.data.Item.choiceType,
                isLoading: false,
            })
        })
    }


    viewAnswer() {
        this.setState({answerState: true});

        console.log(this.state.answer);
    }

    render() {
      const { question, choices, answer, choiceType, isLoading, answerState } = this.state;
      let answerToString = answer.join(',');
      let answerToNumArray =

      console.log("this is from card");
      // console.log(this.props);

      const examNum = this.props.value.match.params.id;
      const test = 100;
      const examChoiceAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      let examChoiceIdx = 0;


      const answerStyle = {
            color: (answerState) ? 'green' : 'black',
          };

      return (

        <Card className="mt-4 mb-4">
          <Card.Header as="h5">문제 # {examNum} </Card.Header>
          <Card.Body>
             <Card.Title>카테고리: 마이그레이션</Card.Title>
            <Card.Text>
            {question}
            </Card.Text>

            <Form>
                {
                  choices.map((choice, index) => {

                    let isCorrectAns = false;
                    for(let i=0 ; i<answer.length ; i++) {
                      if(answer[i].charCodeAt(0)-65 == index) {
                        isCorrectAns = true;
                        console.log("found ans ", index)
                      }
                    }
                    choice = examChoiceAlpha[index] + ". " + choice;

                    return isCorrectAns ?
                      <Form.Check style={answerStyle} inline label={choice}  name="group1" type="radio" id={index+1}  />
                      :
                      <Form.Check  inline label={choice}  name="group1" type="radio" id={index+1}  />

                  }
                )
              }
            </Form>

            <ButtonToolbar
              className="justify-content-between mt-4"
              aria-label="Toolbar with Button groups"
            >
              <Button variant="success" onClick={this.viewAnswer}>답 바로보기</Button>
              {answerState && ( <span > 답 : {answerToString} </span> )}
              <Button href={(parseInt(examNum)+1).toString()} variant="primary">저장 후 계속</Button>
            </ButtonToolbar>


          </Card.Body>
        </Card>
      );
    }
}




export default ExamCard
