import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Column, Divider, Heading, Icon, IconButton, Label, Modal, Text, TextField } from 'gestalt';
import moment from 'moment';
import _ from 'lodash';
import { moodToColorMap } from '../constants';
import { createEntry, updateEntry } from '../../actions/';

class DayBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      dateStr: props.dateStr,
      modalEntry: {
        mood_score: 0,
        mood_reason: '',
        updates: []
      }
    };
    this.handleMoodSelect.bind(this);
  }

  /* FUNCTIONS FOR PARENT DATE BOX */

  drawEntryContent(entry) {
    // if(_.isEmpty(entry)) {
    //   return (
    //     <Box>
    //       <Text>Click the pencil to add some data!</Text>  
    //     </Box>
    //   );
    // }
    return (
      <Box>
        <Box display="flex" direction="row">
          {Array(entry.mood_score).fill().map((_, i) => (
            <Icon key={i} accessibilityLabel="rank" icon="smiley-outline" color="red" />
          ))}
        </Box>
        <Text>{entry.mood_reason}</Text>
        <br />
        <Divider />
        <br />
        <Text bold={true}>Project Updates</Text>
        <br />
        {entry.updates.map((update, i) => (
          <Text key={i} align="left">- {update.body} {this.drawTags(update.tags)}</Text>
        ))}
      </Box>
    );
  }

  drawTags(tags) {
    if(!tags || !tags.length) {
      return '[No Tags]';
    }
    return `[${tags.map(tag => (tag.tag)).join(', ')}]`;
  }

  /* END FUNCTIONS FOR PARENT DATE BOX */
  /* FUNCTIONS FOR MODAL */

  toggleModal() {
    this.setState(prevState => ({ 
      showModal: !prevState.showModal,
      modalEntry: _.cloneDeep(this.props.entry)
    }));
  }

  handleMoodSelect(mood) {
    const { modalEntry } = this.state;
    modalEntry.mood_score = mood;
    this.setState(prevState => ({ modalEntry: modalEntry }));
  }

  handleMoodReason({ value }) {
    const { modalEntry } = this.state;
    modalEntry.mood_reason = value;
    this.setState(prevState => ({ modalEntry: modalEntry }));
  }

  drawUpdate(update, idx) {
    return (
      <Box key={idx}>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor={`update${idx}`}>
              <Text align="left" bold>Update</Text>
            </Label>
          </Column>
          <Column span={8}>
            <TextField 
              id={`update${idx}`}
              value={this.state.modalEntry.updates[idx].body}
              onChange={(e) => this.handleChangeUpdate(e.value, idx)}
            />
          </Column>
        </Box>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor={`labels${idx}`}>
              <Text align="left" bold>Labels</Text>
            </Label>
          </Column>
          <Column span={8}>
          </Column>
        </Box>
        <Box display="flex" direction="row" justifyContent="end" right>
          <IconButton
            accessibilityLabel="Delete"
            icon="remove"
            iconColor="red"
            onClick={() => this.removeUpdate(idx)}
          />
        </Box>
        <Divider />
      </Box>
    );
  }

  addUpdate() {
    const { modalEntry } = this.state;
    modalEntry.updates.push({
      body: '',
      tags: []
    });
    this.setState(prevState => ({ modalEntry: modalEntry }));
  }

  removeUpdate(idx) {
    const { modalEntry } = this.state;
    modalEntry.updates = _.slice(modalEntry.updates, 0, idx).concat(_.drop(modalEntry.updates, idx+1))
    this.setState(prevState => ({ modalEntry: modalEntry })); 
  }

  handleChangeUpdate(body, idx) {
    const { modalEntry } = this.state;
    modalEntry.updates[idx].body = body;
    this.setState(prevState => ({ modalEntry: modalEntry }));
  }

  handleSave() {

  }

  /* END FUNCTIONS FOR MODAL */

  drawEditModal() {
    const { dateStr, modalEntry } = this.state;
    return (
      <Modal
        accessibilityCloseLabel="close"
        accessibilityModalLabel="edit"
        heading={moment(dateStr).format('dddd, MMMM Do')}
        onDismiss={this.toggleModal.bind(this)}
        size="lg"
        footer={
          <Box
            display="flex"
            direction="row"
            justifyContent="end"
          >
            <Box paddingX={1}>
              <Button text="Cancel" inline onClick={this.toggleModal.bind(this)} />
            </Box>
            <Button color="red" inline text="Save" onClick={this.handleSave.bind(this)}/>
          </Box>
        }
      >
        <Box display="flex" direction="row" position="relative" alignItems="center">
          <Column span={12}>
            <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
              <Column span={4}>
                <Label htmlFor="mood_score">
                  <Text align="left" bold>Mood Score</Text>
                </Label>
              </Column>
              <Column span={8}>
                <Box display="flex" direction="row">
                {
                  [...Array(5).keys()].map(i => (
                    <IconButton
                      key={i}
                      accessibilityLabel={`Select ${i+1} Stars`}
                      icon="smiley-outline"
                      iconColor={modalEntry && modalEntry.mood_score > i ? 'red' : 'gray'}
                      onClick={() => this.handleMoodSelect(i+1)}
                    />
                  ))
                }
                </Box>
              </Column>
            </Box>
            <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
              <Column span={4}>
                <Label htmlFor="mood_reason">
                  <Text align="left" bold>Mood Reason</Text>
                </Label>
              </Column>
              <Column span={8}>
                <TextField
                  id="mood_reason"
                  onChange={this.handleMoodReason.bind(this)}
                  value={modalEntry.mood_reason}
                  placeholder="Describe your mood"
                />
              </Column>
            </Box>
            <Divider />
            <Box paddingY={2} paddingX={4} display="flex">
              <Heading size="xs">Project Updates</Heading>
            </Box>
            {_.map(modalEntry.updates, (update, i) => this.drawUpdate(update, i))}               
            <IconButton 
              accessibilityLabel="add an update"
              icon="add-circle"
              iconColor="red"
              size="xl"
              onClick={this.addUpdate.bind(this)}
            />
          </Column>
        </Box>
      </Modal>
    );
  }

	render() {
    const { dateStr, entry } = this.props;
    if(moment().startOf('day') < moment(dateStr)) {
      return (
        <Box></Box>
      );
    }
    return (
      <Box color="lightGray" padding={1} margin={1} key={dateStr}>
        <Box 
          display="flex"
          direction="row"
          alignItems="center"
          color={entry ? moodToColorMap[entry.mood_score]: moodToColorMap[0]}
          padding={2}
        >
          <Box flex="grow">
            <Text bold={true} size="lg">{moment(dateStr).format('dddd, MMMM Do')}</Text>
          </Box>
          <IconButton
            accessibilityLabel="Edit"
            icon="edit"
            iconColor="white"
            size="sm"
            onClick={this.toggleModal.bind(this)}
          />
        </Box>
        <Box color="white" padding={2}>
          {this.drawEntryContent(entry)}
        </Box>
        {this.state.showModal && this.drawEditModal()}
      </Box>
    );
	}
}

function mapStateToProps({ daily_entries }, ownProps) {
  const { dateStr } = ownProps;
  return {
    entry: daily_entries[dateStr] || {
      mood_score: 0,
      mood_reason: '',
      updates: []
    }
  }
}

export default connect(mapStateToProps, { createEntry, updateEntry })(DayBox);

