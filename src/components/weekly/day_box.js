import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Column, Divider, Heading, Icon, IconButton, Label, Modal, Text, TextArea } from 'gestalt';
import moment from 'moment';
import _ from 'lodash';
import { WithContext as ReactTags } from 'react-tag-input';
import { moodToColorMap } from '../common/constants';
import { drawTags } from '../common/utils';
import { createEntry, updateEntry, getTags } from '../../actions/';
import '../common/tags.css';

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
          <Text key={i} align="left">- {update.body} {drawTags(update.tags)}</Text>
        ))}
      </Box>
    );
  }

  /* END FUNCTIONS FOR PARENT DATE BOX */
  /* FUNCTIONS FOR MODAL */

  toggleModal() {
    this.props.getTags();
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
    const tags = _.map(update.tags, tag => ({ text: tag.tag, id: (tag.id || 'null').toString() }));
    return (
      <Box key={idx}>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor={`update${idx}`}>
              <Text align="left" bold>Update</Text>
            </Label>
          </Column>
          <Column span={8}>
            <TextArea 
              id={`update${idx}`}
              value={this.state.modalEntry.updates[idx].body}
              onChange={(e) => this.handleChangeUpdate(e.value, idx)}
            />
          </Column>
        </Box>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor={`tags${idx}`}>
              <Text align="left" bold>Tags</Text>
            </Label>
          </Column>
          <Column span={8}>
            <ReactTags
              tags={tags}
              handleDelete={(e) => this.handleDeleteTag(e, idx)}
              handleAddition={(e) => this.handleAddTag(e, idx)}
              suggestions={this.props.tags}
            />
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
    modalEntry.updates = modalEntry.updates.filter((update, i) => i !== idx)
    this.setState(prevState => ({ modalEntry: modalEntry })); 
  }

  handleChangeUpdate(body, idx) {
    const { modalEntry } = this.state;
    modalEntry.updates[idx].body = body;
    this.setState(prevState => ({ modalEntry: modalEntry }));
  }

  handleAddTag(tag, idx) {
    const { modalEntry } = this.state;
    modalEntry.updates[idx].tags.push({ tag: tag.text, id: null });
    this.setState(prevState => ({ modalEntry: modalEntry }));
  }

  handleDeleteTag(tagIdx, updateIdx) {
    const { modalEntry } = this.state;
    modalEntry.updates[updateIdx].tags = modalEntry.updates[updateIdx].tags.filter((tag, i) => i !== tagIdx);
    this.setState(prevState => ({ modalEntry: modalEntry }));
  }

  handleSave() {
    const { modalEntry } = this.state;
    if(!modalEntry.id) {
      this.props.createEntry(modalEntry, () => window.location.reload());
    } else {
      this.props.updateEntry(modalEntry, () => window.location.reload());
    }
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
                <TextArea
                  id="mood_reason"
                  onChange={this.handleMoodReason.bind(this)}
                  value={modalEntry.mood_reason}
                  placeholder="Describe your mood"
                  rows={2}
                />
              </Column>
            </Box>
            <Divider />
            <Box paddingY={2} paddingX={4} display="flex">
              <Heading size="xs">Project Updates</Heading>
            </Box>
            {_.map(modalEntry.updates, (update, i) => this.drawUpdate(update, i))}
            <Text align="left" bold>Add an Update</Text>
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

function mapStateToProps({ daily_entries, tags }, ownProps) {
  const { dateStr } = ownProps;
  return {
    entry: daily_entries[dateStr] || {
      date_string: dateStr,
      mood_score: 0,
      mood_reason: '',
      updates: []
    },
    tags: _.map(tags, (tag) => ({ id: tag, text: tag }))
  }
}

export default connect(mapStateToProps, { createEntry, updateEntry, getTags })(DayBox);

