import React from "react"
import styled from "styled-components"
import Profile from "./profile"
import { Tag } from "./styledComponents"
import { Link } from "gatsby"

const ArticleItem = ({ article }) => {
  const readingTime = article.description
    ? Math.ceil(article.description.fields.readingTime.minutes)
    : undefined

  return (
    <Wrapper>
      {article.author && <Profile profile={article.author} />}
      <Link to={`/tools/${article.slug}`}>
        <Title>{article.title}</Title>
        <ShortDescription>{article.shortDescription}</ShortDescription>
      </Link>
      <MetaWrapper>
        {article.tags?.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
        <Meta>
          <Date dateTime={article.fullDate} title={article.fullDate}>
            {article.shortDate}
          </Date>
          {readingTime && (
            <>
              <Separator>·</Separator>
              <ReadingTime>{readingTime} min läsning</ReadingTime>
            </>
          )}
        </Meta>
      </MetaWrapper>
    </Wrapper>
  )
}

export default ArticleItem

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  padding: 20px 30px 15px 30px;
  background-color: #fff;
  border-radius: 18px;
  color: var(--color-heading);
`

const Title = styled.h3`
  font-size: 20px;
  margin-top: 0 !important;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`

const Meta = styled.div`
  display: flex;
  gap: 5px;
  color: var(--color-text);
  margin-left: auto;
`

const Separator = styled.span``

const Date = styled.time``

const ReadingTime = styled.span``

const ShortDescription = styled.p``

const MetaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: auto;

  > * {
    margin-bottom: 10px;
  }
`
