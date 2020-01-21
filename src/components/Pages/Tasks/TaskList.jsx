import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TaskListEntry from '../Tasks/TaskListEntry'

class TaskList extends Component {
    state = {
        tasks: [],
        searchString: ''
    }
    constructor() {
        super()
        // this.getTasks()
    }

    /**** API GET TODO 
    getTasks = () => {
        tasks.getEntries({
            content_type: 'task',
            query: this.state.searchString
        })
            .then((response) => {
                this.setState({ tasks: response.items })
                console.log(this.state.tasks)
            })
            .catch((error) => {
                console.log("Error occurred while fetching Entries")
                console.error(error)
            })
    }
    *****/
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
        }
        this.getTasks()
    }
    render() {
        return (
            <div>
                {this.state.tasks ? (
                    <div>
                        <TextField style={{ padding: 24 }}
                            id="searchInput"
                            placeholder="Search for Tasks"
                            margin="normal"
                            onChange={this.onSearchInputChange}
                        />
                        <Grid container spacing={24} style={{ padding: 24 }}>
                            {this.state.tasks.map(currentTask => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <TaskListEntry task={currentTask} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No task found"}
            </div>
        )
    }
}
export default TaskList;