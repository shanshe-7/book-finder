import React from "react";
import uuid from "react-uuid";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import classes from "./books.module.scss";

const Books = ({ booksData }) => {
  let imgSource = "https://i.imgur.com/sJ3CT4V.gif";
  let title = booksData.map((item) => (
    <Grid key={uuid()} className={classes.grid} item xl={12} md={6}>
      <Card
        className={classes.card}
        style={{
          backgroundColor: "#e3f2fd",
          color: "#3e2723",
        }}
      >
        <CardHeader
          title={
            <a
              className={classes.title}
              href={item.infoLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              {item.title}
            </a>
          }
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {item.imageLinks ? (
              <img
                className={classes.image}
                src={item.imageLinks.thumbnail}
                alt={item.title}
              />
            ) : (
              <img src={imgSource} className={classes.image} alt={item.title} />
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography className={classes.text}>
                <b>Author: </b>
                {item.authors
                  ? item.authors.map((a) => `${a}  `)
                  : "Author not found"}
                <br />
                <b>Pages: </b>
                {item.pageCount ? item.pageCount : "Pages not found"}
                <br />
                <b>Language: </b>
                {item.language ? item.language : "Language not found"}
                <br />
                <b>Publication Year: </b>
                {item.publishedDate
                  ? item.publishedDate.slice(0, 4)
                  : "Publication Year not found"}
                <br />
                <b>Publisher: </b>
                {item.publisher ? item.publisher : "Publisher not found"}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  ));
  return (
    <Grid container justify='center'>
      {title}
    </Grid>
  );
};

export default Books;
