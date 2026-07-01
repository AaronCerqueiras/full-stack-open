const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => (
  <div>
	{props.parts.map((part) => (<Part key={part.id} part={part}/>))}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <b>Total of {props.total} exercises</b>

const Course = (props) => {

	const course = props.course

	const total = course.parts.reduce(
		(s,p) => s+p.exercises,
		0,
	)

	return(
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total total={total}/>
		</div>
	)
}

export default Course